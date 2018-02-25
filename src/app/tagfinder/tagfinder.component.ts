import { Component, OnInit } from '@angular/core';

import { Tag } from '../tag';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tagfinder',
  templateUrl: './tagfinder.component.html',
  styleUrls: ['./tagfinder.component.css']
})
export class TagfinderComponent implements OnInit {

  //tag: Tag = new Tag('init');
  tags: Tag[] = new Array();
  texts: string[] = new Array();
  selectedCount = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getTag();
    this.getTags( 'snow');
  }

  getTag(): void {
    this.dataService.getTagInfo('snow')
      .subscribe(
        tag => console.log(tag) //this.tag = tag
      );
  }

  getTags(query: string): void {
    this.dataService.getTags( query )
      .subscribe(
        tags =>  console.log (tags) // do nothing
      );
  }

  getMediaByTag(query: string): void {
    this.dataService.getMediaByTag( query )
      .subscribe(
        tags => {

          const regExText = /"text":"[^"]*/g;
          const regExTag =  /#[^ |\n|#|@]*/g;

          const tagSets = tags.match(regExText);
          //let tags2: Tag[] = new Array();

          tagSets.forEach(tagSet => {

            const tempTags: string[] = tagSet.match(regExTag);

            if (tempTags != null) {
              tempTags.forEach(tempTag => {
                tempTag = tempTag.slice(1);
                let tag = this.tags.find(x => x.name === tempTag);
                if ( tag == null) {
                  // tag not yet stored: store it now
                  this.tags.push(new Tag(tempTag));
                } else {
                  // tag already there: increment count
                  tag.incrementCount();
                }
              });
            }
          });

          this.tags.sort( (a: Tag, b: Tag) => {
            return b.count - a.count;
          });

          this.tags = this.tags.filter( tag => tag.count > 3 ).slice(0, 40);

          //this.tags = tags2;
        }
      );
  }

  toggleTag(tag: Tag): void {
    tag.selected = !tag.selected;
    this.updateSelectedCount();
  }

  updateSelectedCount(): void {
    let count = 0;
    this.tags.forEach(tag => {
      if (tag.selected) {
        count++;
      }
    });
    this.selectedCount = count;
  }
}
