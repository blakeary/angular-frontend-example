import { NestedWorkPackage } from './nested-work-package';

export interface NestedDeliverable {
    id: string;
    name: string;
    description: string;
    work_packages: NestedWorkPackage[];
}
