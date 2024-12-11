import { window } from "vscode"

export class NotifiyUtil {
    // 错误信息提示
    public static showErrorMessage(message: string): () => void {
        return () => {
            window.showErrorMessage(message)
            throw new Error(message)
        }
    }
}