import { Injectable } from '@angular/core';

@Injectable()
export class LocalCounterService {
    id = Math.floor(Math.random() * 1000);
    value = 0;
    inc() {
        this.value++;
    }
}