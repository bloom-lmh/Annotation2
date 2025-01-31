import * as vscode from 'vscode';
export enum MemberType {
  CLASS = 0,
  METHOD,
  ENUM,
  PROPERTY,
  TYPEDEF,
  INTERFACE
}
export class ErrorNotifier {
  static showMemberParseError(type: MemberType, startLineNumber: number) {
    let memberNames = [
      ["类", "class"],
      ["方法", "method"],
      ["枚举", "enum"],
      ["属性", "property"],
      ["类型", "typealias"],
      ["接口", "interface"]]
    // 获取类型别名
    let [memberNameCh, memberNameEn] = memberNames[type]
    vscode.window.showInformationMessage(`
        存在${memberNameCh}声明解析失败，采用默认类注解，出错位置行号：${startLineNumber} 
        There is a ${memberNameEn} declaration parsing failure, using the default ${memberNameEn} annotation, error location line number：${startLineNumber} 
    `)
  }
}