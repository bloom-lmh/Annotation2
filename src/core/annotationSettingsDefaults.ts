import { AnnotationSettings } from './annotationSettingsTypes';

const defaultSettings: AnnotationSettings = {
  behavior: {
    mode: 'insert',
  },
  global: {
    authorInfo: '',
    versionInfo: '',
    licenseInfo: '',
    copyrightInfo: '',
  },
  class: {
    tags: {
      classTag: true,
      abstractTag: true,
      extendsTag: true,
      implementsTag: true,
      authorTag: false,
      aliasTag: false,
      versionTag: false,
      nameTag: true,
      descriptionTag: true,
      seeTag: false,
      exampleTag: false,
      templateTag: true,
    },
  },
  method: {
    tags: {
      asyncTag: true,
      functionTag: true,
      constructorTag: true,
      throwsTag: true,
      paramsTag: true,
      returnsTag: true,
      staticTag: true,
      accessTag: true,
      authorTag: false,
      aliasTag: false,
      versionTag: false,
      nameTag: true,
      descriptionTag: true,
      seeTag: false,
      exampleTag: false,
      templateTag: true,
    },
  },
  property: {
    tags: {
      propertyTag: true,
      typeTag: true,
      staticTag: true,
      defaultTag: true,
      aliasTag: true,
      nameTag: true,
      descriptionTag: true,
      seeTag: false,
      exampleTag: false,
      templateTag: true,
    },
  },
  interface: {
    tags: {
      interfaceTag: true,
      extendsTag: true,
      authorTag: false,
      versionTag: false,
      templateTag: true,
      aliasTag: false,
      nameTag: true,
      descriptionTag: true,
      seeTag: false,
      exampleTag: false,
    },
  },
  enum: {
    tags: {
      enumTag: true,
      aliasTag: false,
      nameTag: true,
      descriptionTag: true,
      seeTag: false,
      exampleTag: false,
    },
  },
  typedef: {
    tags: {
      typedefTag: true,
      typeTag: true,
      templateTag: true,
      aliasTag: true,
      nameTag: true,
      descriptionTag: true,
      seeTag: true,
      exampleTag: true,
    },
  },
};

export function createDefaultAnnotationSettings(): AnnotationSettings {
  return structuredClone(defaultSettings);
}
