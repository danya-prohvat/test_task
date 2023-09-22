import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailsService } from '@services/details.service';
import { IDetails } from '@types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  constructor(
    private detailsService: DetailsService,
    private toastr: ToastrService,
  ) {}

  details: IDetails = [];
  analogues: IDetails = [];

  detailsLoading = false;
  analoguesLoading = false;
  isSubmitted = false;

  desiredAnalogId: number | null = null;

  form = new FormGroup({
    detail: new FormControl(''),
  });

  submit() {
    this.isSubmitted = true;
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
