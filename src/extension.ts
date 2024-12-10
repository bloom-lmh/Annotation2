import { workspace, ExtensionContext } from 'vscode';
import { ClassAnnotationDirector } from './annotation/annotationDirector';
import { ClassAnnotationBuilder } from './annotation/annotationBuilder';
import { ClassAnnotation } from './annotation/annotation';

// 插件激活
export function activate(context: ExtensionContext) {
    let defaultClassAnnotation: ClassAnnotation = ClassAnnotationDirector.buildDefaultClassAnnotation(new ClassAnnotationBuilder(new ClassAnnotation()))
    console.log(defaultClassAnnotation);


}

export function deactivate() {

}
