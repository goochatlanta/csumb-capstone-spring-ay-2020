import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tone',
  templateUrl: './tone.component.html',
  styleUrls: ['./tone.component.scss']
})
export class ToneComponent implements OnInit {
	resultText = 'Something';

  	constructor() { }

  	ngOnInit(): void {
  	}

  	positiveText(): void {
	    this.resultText = 'Ah, something positive then?';
	}

	negativeText(): void {
	    this.resultText = 'Mmm, so something negative?';
	}
}
