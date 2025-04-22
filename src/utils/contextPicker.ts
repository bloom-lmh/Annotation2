import * as vscode from 'vscode';


export class ContextPicker {
  /**
   * 编辑器
   */
  private editor: vscode.TextEditor

  /**
   * 文档
   */

  /**
   * @param editor 编辑器对象
   */
  constructor(editor: vscode.TextEditor) {
    // 编辑器
    this.editor = editor
  }
  /**
   * 
   * @returns 
   */
  public pickCursorWordText(): string {
    // 获取光标位置对象
    const position = this.editor.selection.active;
    // 获取光标所在单词的范围  
    const wordRange = this.editor.document.getWordRangeAtPosition(position);
    // 获取光标所在单词的文本  
    const wordText = this.editor.document.getText(wordRange);
    // 返回单词
    return wordText
  }
  /**
 * 拾取文件名,包含路径
 */
  public pickFileName() {
    return this.editor.document.fileName
  }
  /**
   * 拾取行号
   */
  public pickLineNumber() {
    // 获取光标位置对象
    const position = this.editor.selection.active;
    // 获取行号
    const lineNumber = position?.line;
    // 返回光标行号
    return lineNumber + 1
  }
  /**
   * 拾取文本
   */
  public pickDocument() {
    return this.editor.document
  }
  /**
   * 拾取并返回拾取信息上下文
   */
  public pick(): PickContext {
    // 获取拾取的文件路径
    const fileName = this.pickFileName()
    // 获取光标所在单词的文本  
    const wordText = this.pickCursorWordText()
    // 获取行号
    const lineNumber = this.pickLineNumber()
    // 获取文档
    const document = this.pickDocument()
    // 返回拾取上下文对象
    return { fileName, wordText, lineNumber, document };
  }
}

export interface PickContext {
  /**
   * 文件名
   */
  fileName: string
  /**
   * 行号
   */
  lineNumber: number;
  /**
   * 选中单词
   */
  wordText: string
  /**获取到的文档 */
  document: vscode.TextDocument
}