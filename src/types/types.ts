import type Ancestor from "./Ancestor";

export enum MemberType {
    Male = 1,
    Female = 0,
};

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type AncestorLevel = Map<string, Ancestor>;