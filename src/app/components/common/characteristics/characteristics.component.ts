import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DetailsService } from '@services/details.service';
import { ToastrService } from 'ngx-toastr';
import { ICharacteristics } from 'src/app/types/details.types';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.scss']
})
export class CharacteristicsComponent  implements OnChanges {
  constructor(private detailsService: DetailsService, private toastr: ToastrService) {}

  @Input() desiredAnalogId: number | null = null
  characteristics: ICharacteristics = [];

  loading = false

  loadCharacteristics() {
    this.loading = true;
    this.characteristics = [];

    this.detailsService
      .getCharacteristics(this.desiredAnalogId)
      .subscribe({
        next: (data) => {
          this.loading = false;
          this.characteristics = data;
          console.log(this.characteristics)
        },
        error: () => {
          this.loading = false;
          this.toastr.error('Something went wrong');
        },
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['desiredAnalogId']){
      if (changes['desiredAnalogId'].currentValue) this.loadCharacteristics()
      else this.characteristics = [];
    }
  }
}
