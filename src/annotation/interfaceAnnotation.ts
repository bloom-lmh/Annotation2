import { BaseAnnotation } from "./baseAnnotation";

export class InterfaceAnnotation extends BaseAnnotation {
    protected _interface: boolean | null = null;
    protected _name: string | null = null;
    protected _extends: string | null = null;
    protected _implements: string | null = null;
    protected _methods: Array<string> | null = null;
    protected _properties: Array<string> | null = null;
    protected _description: string | null = null;
    protected _readonly: boolean | null = null;
    protected _version: string | null = null;
    protected _implement: string | null = null;
    protected _returns: string | null = null;
}