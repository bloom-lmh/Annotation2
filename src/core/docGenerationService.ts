import * as vscode from 'vscode';
import { AstParser } from '../ast/astParser';
import {
  CommentEditHelper,
  CommentEditOperation,
  CommentEditPlan,
} from '../command/commentEditHelper';
import { buildDocBlock } from './docBuilder';
import { AnnotationSettings, loadAnnotationSettings } from './annotationSettings';
import { DocTarget } from './docTarget';
import { DocTargetParser } from './docTargetParser';

export interface SingleDocGenerationResult {
  status: 'ready' | 'no-target' | 'skipped-existing';
  operation: CommentEditOperation | null;
}

export interface BatchDocGenerationResult {
  status: 'ready' | 'no-target' | 'skipped-existing';
  operations: CommentEditOperation[];
  targetCount: number;
  readyCount: number;
  skippedExistingCount: number;
}

export class DocGenerationService {
  private static readonly targetCache = new Map<string, CachedTargets>();
  private static readonly maxCacheEntries = 20;

  constructor(
    private readonly document: vscode.TextDocument,
    private readonly projectPath: string,
  ) {}

  public createSingleResult(lineNumber: number): SingleDocGenerationResult {
    const parser = new DocTargetParser();
    const target = parser.findAtLine(this.getTargets(), lineNumber);
    if (!target) {
      return {
        status: 'no-target',
        operation: null,
      };
    }

    const settings = loadAnnotationSettings(this.projectPath, this.document);
    const plan = this.createPlan(target, settings);
    return {
      status: plan.status === 'skip-existing' ? 'skipped-existing' : 'ready',
      operation: plan.operation,
    };
  }

  public createSingleOperation(lineNumber: number): CommentEditOperation | null {
    return this.createSingleResult(lineNumber).operation;
  }

  public createAllResult(): BatchDocGenerationResult {
    const settings = loadAnnotationSettings(this.projectPath, this.document);
    const plans = this.getTargets().map(target => this.createPlan(target, settings));
    const operations = plans
      .map(plan => plan.operation)
      .filter((operation): operation is CommentEditOperation => !!operation);
    const skippedExistingCount = plans.filter(plan => plan.status === 'skip-existing').length;
    const targetCount = plans.length;

    return {
      status: this.resolveBatchStatus(targetCount, operations.length),
      operations,
      targetCount,
      readyCount: operations.length,
      skippedExistingCount,
    };
  }

  public createAllOperations(): Array<CommentEditOperation | null> {
    const result = this.createAllResult();
    return result.operations;
  }

  private getTargets(): DocTarget[] {
    const cacheKey = this.document.uri.toString();
    const cached = DocGenerationService.targetCache.get(cacheKey);
    if (cached?.version === this.document.version) {
      return cached.targets;
    }

    const sourceFile = new AstParser().parseByText(this.document.getText(), this.document.fileName);
    const targets = new DocTargetParser().parseAll(sourceFile);

    DocGenerationService.targetCache.set(cacheKey, {
      version: this.document.version,
      targets,
    });
    this.trimCache();

    return targets;
  }

  private trimCache() {
    while (DocGenerationService.targetCache.size > DocGenerationService.maxCacheEntries) {
      const oldestKey = DocGenerationService.targetCache.keys().next().value;
      if (!oldestKey) {
        return;
      }
      DocGenerationService.targetCache.delete(oldestKey);
    }
  }

  private createPlan(target: DocTarget, settings: AnnotationSettings): CommentEditPlan {
    const jsdoc = buildDocBlock(target, settings);
    return CommentEditHelper.planOperation(
      this.document,
      target.declaration,
      jsdoc,
      settings.behavior.mode,
    );
  }

  private resolveBatchStatus(
    targetCount: number,
    operationCount: number,
  ): BatchDocGenerationResult['status'] {
    if (targetCount === 0) {
      return 'no-target';
    }

    if (operationCount === 0) {
      return 'skipped-existing';
    }

    return 'ready';
  }
}

interface CachedTargets {
  version: number;
  targets: DocTarget[];
}
