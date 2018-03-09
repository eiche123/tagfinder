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
  showStartButton = false;
  showMoreButton = false;

  displayedTags: Tag[] = new Array();
  tagsInText: Tag[] = new Array();
  cachedTags: Tag[] = new Array();
  recommendedTagStrings: string[] = ['travel', 'photography', 'travelphotography', 'adventure', 'photooftheday', 'wanderlust',
    'instatravel', 'explore', 'travelgram', 'exploreeverything', 'neverstopexploring', 'agameoftones',
    'beautifuldestinations', 'backpacking', 'backpacker'];
  recommendedTags: Tag[] = new Array();
  selectedCount = 0;
  text = '';

  private regExTag =  /#[^\n|#|@| ]*/g;
  private regExJJForumTag = /#jj_forum_[^\n|#|@| |\\|.]*/g;
  private regExGOTDTag = /#gotd_[^\n|#|@| |\\|.]*/g;
  private regExMedia = /"media":{"node(.*?)],"count"/g;

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.recommendedTagStrings.forEach(tagString => {
      const recommendedTag = new Tag(tagString);
      recommendedTag.selected = true;
      this.recommendedTags.push(recommendedTag);
    });

    this.cachedTags = this.recommendedTags.slice();
    this.updateSelectedCount();

    this.dataService.getJJCommunityThemeOfTheDay()
      .subscribe( html => {
        this.parseSpecialTagAndUpdateCachedTags(html, this.regExJJForumTag, 9);
        this.updateDisplayedTags();
      });

    this.dataService.getGOTDThemeOfTheDay()
      .subscribe( html => {
        this.parseSpecialTagAndUpdateCachedTags(html, this.regExGOTDTag, 5);
        this.updateDisplayedTags();
      });
  }

  search(query: string) {
    query = query.toLocaleLowerCase();
    const tag = new Tag(query);
    tag.selected = true;
    this.cachedTags.push(tag);
    this.getMediaByTag(query);
  }

  startSearch() {
    if (this.text !== '') {
      this.text = this.text.toLocaleLowerCase();
      const tags = this.text.match(this.regExTag);
      if (tags != null) {
        tags.forEach(tag => {
          // cut off the '#'
          tag = tag.slice(1);
          this.tagsInText.push(new Tag(tag));
          this.updateSelectedCount();
          this.getMediaByTag(tag);
        });
      }
    }
  }


  focusInput(textarea) {
    this.showPlaceholder = false;
    this.showStartButton = true;
    textarea.focus();
  }

  defocusInput() {
    if (this.text === '') {
      this.showPlaceholder = true;
      this.showStartButton = false;
    }
  }

  getMediaByTag(query: string): void {
    this.dataService.getMediaByTag( query )
      .subscribe(
        html => {
          this.updateCachedTags(html);
          this.updateDisplayedTags();
          this.showStartButton = false;
          this.showMoreButton = true;
        }
      );
  }

  updateCachedTags(html: string): void {

    // parse Html for tags
    const tempTags = html.match(this.regExTag);
    tempTags.forEach( tempTag => {

      // cut off the '#'
      tempTag = tempTag.slice(1).toLocaleLowerCase();

      // check for code in tags like \u and {
      if (!(tempTag.includes('\\u') || tempTag.includes('{') ||
         tempTag.includes( '}'))) {


        // check that tag is not in the text
        if ( !this.tagsInText.find(x => x.name === tempTag) ) {

          // check if tag is already known
          const knownTag = this.cachedTags.find(x => x.name === tempTag);
          if (knownTag) {
            // known tag: increment count
            knownTag.incrementCount();
          } else {
            // new tag: store it
            this.cachedTags.push(new Tag(tempTag));
          }
        }
      }
    });

    // sort tags
    this.cachedTags.sort( (a: Tag, b: Tag) => {
      return b.getValue() - a.getValue();
    });

    // just take the top 45 tags
    // this.cachedTags = this.cachedTags.slice(0, 45);
  }

  parseSpecialTagAndUpdateCachedTags(html: string, regEx: RegExp, position: number) {
    let media = html.match(this.regExMedia)[0];
    media = media.substring(8, media.length - 8) + '}';
    const nodes = JSON.parse(media).nodes;

    let previousCount: number;
    let previousNode = null;
    let previousTag = '';
    let initialPostFound = false;

    nodes.forEach(node => {
      if (!initialPostFound) {
        const caption = node.caption;
        const jjForumTag = caption.match(regEx);
        if ( jjForumTag !== null && jjForumTag.length > 0) {
          const currentTag = jjForumTag[0].substring(1);
          const currentCount = parseInt(currentTag.substring(position), 10);
          if (currentCount < previousCount) {
            initialPostFound = true;
          } else {
            previousCount = currentCount;
            previousNode = node;
            previousTag = currentTag;
          }
        }
      }
    });


    const tag = new Tag(previousTag);
    tag.selected = true;
    tag.thumbnail = previousNode.thumbnail_src.slice();
    tag.caption = previousNode.caption.slice();
    tag.count = 10000;
    this.cachedTags.push(tag);
  }

  getMediaByTagAndCache(query: string): void {
    this.dataService.getMediaByTag( query )
      .subscribe(
        html => {
          // only parse and sort tags, but not assign them to the displayed tags array
          this.updateCachedTags(html);
        }
      );
  }

  updateDisplayedTags(): void {
    this.displayedTags = this.cachedTags.slice(0, 45);
    this.updateSelectedCount();
  }

  toggleTag(tag: Tag): void {
    tag.selected = !tag.selected;
    if ( tag.selected ) {
      this.getMediaByTagAndCache(tag.name);
    }
    this.updateSelectedCount();
  }

  updateSelectedCount(): void {
    let count = 0;
    this.displayedTags.forEach(tag => {
      if (tag.selected) {
        count++;
      }
    });
    this.selectedCount = count + this.tagsInText.length;
  }

  getText(): String {
    let tags = '';
    this.displayedTags.forEach(tag => {
      if (tag.selected) {
        tags = tags + '#' + tag.name + ' ';
      }
    });
    return this.text + '\n.\n.\n.\n' + tags;
  }

  determineClass(tag: Tag): string[] {
    const classTags: string[] = new Array();
    classTags.push(tag.selected ? 'selected' : '');
    classTags.push(tag.caption != null ? 'special' : '');
    return classTags;
  }

  displayOverlay(overlayId: string, displayProperty: string): void {
    document.getElementById(overlayId).style.display = displayProperty;
  }
}
