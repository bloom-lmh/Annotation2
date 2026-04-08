export const commandMessages = {
  editorUnavailable: '当前没有可用的编辑器。',
  workspaceUnavailable: '当前文件不在工作区内，无法加载项目配置。',
  noDeclarationFound: '当前位置没有可解析的声明。',
  skippedExisting: '当前位置已有注释，已按 skip 模式跳过。',
  editFailed: '注释编辑未成功应用，请重试。',
  batchSkippedExisting(targetCount: number): string {
    return `共找到 ${targetCount} 处可注释声明，但都因 skip 模式被跳过。`;
  },
  batchCompleted(createdCount: number, skippedExistingCount: number): string {
    if (skippedExistingCount > 0) {
      return `已处理注释生成，共应用 ${createdCount} 处变更，跳过 ${skippedExistingCount} 处已有注释。`;
    }

    return `已处理注释生成，共应用 ${createdCount} 处变更。`;
  },
} as const;
