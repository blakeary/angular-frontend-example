import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): string {
        const limit = args.length > 0 && !isNaN(Number(args[0])) ? parseInt(args[0] as string, 10) : 50;
        const trail = '...';

        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}
