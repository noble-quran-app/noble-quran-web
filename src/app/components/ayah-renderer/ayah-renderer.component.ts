import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { IdbService } from 'src/app/services/idb.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'ayah-renderer',
  templateUrl: './ayah-renderer.component.html',
  styleUrls: ['./ayah-renderer.component.scss'],
})
export class AyahRendererComponent implements OnInit, OnDestroy {
  @Input() ayahId: number;
  @Input() ayahIndex: number;
  @Output('onStateChange') stateChange = new EventEmitter();
  @ViewChild('positionDetector') positionDetector: ElementRef;

  constructor(
    private idb: IdbService,
    public settings: SettingService,
    public audioService: AudioService
  ) {}

  public ayah: any;
  private idSubscription: Subscription;
  public isPlaying: boolean;

  async ngOnInit() {
    try {
      this.ayah = await this.idb.getAyahWithEditons(this.ayahId, [
        'quran.simple',
        'en.sahih',
      ]);

      this.stateChange.emit([this.ayahIndex]);
    } catch (error) {
      this.stateChange.emit([this.ayahIndex, error.message]);
    }

    this.idSubscription = this.audioService.currentAyahId.subscribe((id) => {
      this.isPlaying = id === this.ayahId;
      this.scrollToCurrentAyah();
    });
  }

  scrollToCurrentAyah() {
    if (this.isPlaying && this.positionDetector?.nativeElement) {
      const { top } = this.positionDetector?.nativeElement?.getBoundingClientRect();
      const header = document.querySelector('read-header header');
      const { top: headerTop, height: headerHeight } = header?.getBoundingClientRect();
      const scrollY = top - headerHeight - headerTop;

      if (!isNaN(scrollY)) {
        window.scrollBy({
          left: 0,
          top: scrollY,
          behavior: 'smooth',
        });
      }
    }
  }

  ngOnDestroy() {
    this.idSubscription?.unsubscribe();
  }
}
