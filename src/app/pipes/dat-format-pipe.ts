import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datFormat',
})
export class DatFormatPipe implements PipeTransform {
  transform(date :string): string {

    const dateStr = new Date(date)
    const dateFm = Intl.DateTimeFormat(
      'en-US',
      {year:'numeric',month:'2-digit',day:'numeric'}
    )

    return dateFm.format(dateStr);

  }
}
