import { Component, OnInit } from '@angular/core';

import { Tag } from '../tag';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tagfinder',
  templateUrl: './tagfinder.component.html',
  styleUrls: ['./tagfinder.component.css']
})
export class TagfinderComponent implements OnInit {

  placeholderText = 'Describe your image.';
  placeholderSubtext = 'Use #hashtags to get further tags suggested.';
  showPlaceholder = true;

  tags: Tag[] = new Array();
  selected_tags: Tag[] = new Array();
  selectedCount = 0;
  text = '';

  private regExTag =  /#[^\n|#|@| ]*/g;

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }


  focusInput(textarea) {
    this.showPlaceholder = false;
    textarea.focus();
  }

  defocusInput() {
    if (this.text === '') {
      this.showPlaceholder = true;
    } else {
      const tags = this.text.match(this.regExTag);
      if (tags != null) {
        tags.forEach(tag => {
          // cut off the '#'
          tag = tag.slice(1);
          this.getMediaByTag(tag);
        });
      }
    }
  }



  getMediaByTag(query: string): void {
    this.dataService.getMediaByTag( query )
      .subscribe(
        html => {

          const tempTags = html.match(this.regExTag);

          tempTags.forEach( tempTag => {
            // cut off the '#'
            tempTag = tempTag.slice(1);
            const knownTag = this.tags.find( x => x.name === tempTag);
            const selectedTag = this.selected_tags.find( x => x.name === tempTag);
            if ( selectedTag != null ) {
              selectedTag.incrementCount();
            } else {
              if (knownTag == null) {
                // new tag: store it
                this.tags.push(new Tag(tempTag));
              } else {
                // known tag: increment count
                knownTag.incrementCount();
              }
            }
          });

          this.tags.sort( (a: Tag, b: Tag) => {
            return b.count - a.count;
          });

          this.tags = this.tags.slice(0, 40);
        }
      );
  }

  toggleTag(tag: Tag): void {
    tag.selected = !tag.selected;
    this.updateSelectedCount();
    if ( tag.selected ) {
      this.selected_tags.push(tag);
      const position = this.tags.indexOf(tag);
      if (position > -1) {
        this.tags.splice(position, 1);
      }
      tag.order = position;
      this.getMediaByTag(tag.name);
    }
  }

  updateSelectedCount(): void {
    let count = 0;
    this.tags.forEach(tag => {
      if (tag.selected) {
        count++;
      }
    });
    this.selectedCount = this.selected_tags.length;
  }
}
