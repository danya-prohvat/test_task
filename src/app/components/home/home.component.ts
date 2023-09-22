import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DetailsService } from 'src/app/services/details.service';
import { IDetails } from 'src/app/types/details.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private detailsService: DetailsService,
    private toastr: ToastrService,
  ) {}

  details: IDetails = [];
  analogues: IDetails = [];

  detailsLoading = false;
  analoguesLoading = false;

  desiredAnalogId: number | null = null;

  form = new FormGroup({
    detail: new FormControl(''),
  });

  submit() {
    this.detailsLoading = true;
    this.details = [];
    this.analogues = [];
    this.detailsService.search(this.form.value.detail).subscribe({
      next: (data) => {
        this.detailsLoading = false;
        this.desiredAnalogId = data.details[0].id;
        this.loadAng();
        this.details = data.details;
      },
      error: () => {
        this.detailsLoading = false;
        this.toastr.error('Something went wrong');
      },
    });
  }

  loadAng() {
    this.analoguesLoading = true;
    this.analogues = [];
    const detail = this.details.find(
      (detail) => detail.id === this.desiredAnalogId,
    );

    this.detailsService
      .searchAnal(detail?.displayBrand, detail?.article)
      .subscribe({
        next: (data) => {
          this.analoguesLoading = false;
          this.analogues = data;
        },
        error: () => {
          this.analoguesLoading = false;
          this.toastr.error('Something went wrong');
        },
      });
  }

  changeDetail(id: number) {
    this.desiredAnalogId = id;
    this.loadAng();
  }
}
