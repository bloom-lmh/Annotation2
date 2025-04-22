import { ClassAnnotationConfig } from './classAnnotationConfig';
import { EnumAnnotationConfig } from './enumAnnotationConfig';
import { FileAnnotationConfig } from './fileAnnotationConfig';
import { GlobalAnnotationConfig } from './globalAnnotationConfig';
import { InterfaceAnnotationConfig } from './interfaceAnnotationConfig';
import { MethodAnnotationConfig } from './methodAnnotationConfig';
import { PropertyAnnotationConfig } from './propertyAnnotationConfig';
import { SystemConfig } from './systemConfig';
import { TranslateConfig } from './translateConfig';
import { TypedefAnnotationConfig } from './typedefAnnotationConfig';

export class Config {
  public interfaceAnnotationConfig?: InterfaceAnnotationConfig;
  public typedefAnnotationConfig?: TypedefAnnotationConfig;
  public enumAnnotationConfig?: EnumAnnotationConfig;
  public classAnnotationConfig?: ClassAnnotationConfig;
  public methodAnnotationConfig?: MethodAnnotationConfig;
  public propertyAnnotationConfig?: PropertyAnnotationConfig;
  public globalAnnotationConfig?: GlobalAnnotationConfig;
  public fileAnnotationConfig?: FileAnnotationConfig;
  public translateConfig?: TranslateConfig;
  public systemConfig?: SystemConfig;

  constructor(
    projectConfig: {
      interfaceAnnotationConfig?: Partial<InterfaceAnnotationConfig>;
      typedefAnnotationConfig?: Partial<TypedefAnnotationConfig>;
      enumAnnotationConfig?: Partial<EnumAnnotationConfig>;
      classAnnotationConfig?: Partial<ClassAnnotationConfig>;
      methodAnnotationConfig?: Partial<MethodAnnotationConfig>;
      propertyAnnotationConfig?: Partial<PropertyAnnotationConfig>;
      globalAnnotationConfig?: Partial<GlobalAnnotationConfig>;
      translateConfig?: Partial<TranslateConfig>;
      fileAnnotationConfig?: Partial<FileAnnotationConfig>;
      systemConfig?: Partial<SystemConfig>;
    } = {},
  ) {
    const {
      interfaceAnnotationConfig,
      typedefAnnotationConfig,
      enumAnnotationConfig,
      classAnnotationConfig,
      methodAnnotationConfig,
      propertyAnnotationConfig,
      globalAnnotationConfig,
      translateConfig,
      fileAnnotationConfig,
      systemConfig,
    } = projectConfig;
    this.interfaceAnnotationConfig = new InterfaceAnnotationConfig(interfaceAnnotationConfig);
    this.typedefAnnotationConfig = new TypedefAnnotationConfig(typedefAnnotationConfig);
    this.enumAnnotationConfig = new EnumAnnotationConfig(enumAnnotationConfig);
    this.classAnnotationConfig = new ClassAnnotationConfig(classAnnotationConfig);
    this.methodAnnotationConfig = new MethodAnnotationConfig(methodAnnotationConfig);
    this.propertyAnnotationConfig = new PropertyAnnotationConfig(propertyAnnotationConfig);
    this.globalAnnotationConfig = new GlobalAnnotationConfig(globalAnnotationConfig);
    this.translateConfig = new TranslateConfig(translateConfig);
    this.fileAnnotationConfig = new FileAnnotationConfig(fileAnnotationConfig);
    this.systemConfig = new SystemConfig(systemConfig);
  }
}
export { ClassAnnotationConfig };
