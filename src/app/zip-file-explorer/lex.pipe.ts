import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'lex'
})
export class LexPipe implements PipeTransform {
  public lex: Object = new Object();
  constructor(private sanitizer:DomSanitizer){
    this.makeLex();
  }
  transform(value: string, args?: any): any{
   for(let lexDict in this.lex){
    if(this.lex.hasOwnProperty(lexDict)){
      value = this.parse(lexDict,value);
    }
   }
   return this.sanitizer.bypassSecurityTrustHtml(value);
  }
  parse(dict: string, template: string): string{
    return template.replace(this.lex[dict],dict);
  }
  makeLex(){
      /* this poor scalable lex pipe is mostly to parse text and assign it a span "token"
      * sanizitation is a major concern in this code
      * high quality contextual highlighting can only be done with a full lex-bison esque parse
      * with the lex side sorting into tokens for the bison side to recombine into
      * a complete template tree with tokens snippets ( <span [innertext]=tokenvalue [class]=tokentype> )
      * only creating a token after matching or exhausting the lex matches
      * 
      * the first noticable issue is >token < occurences. attempting to ignore them with
      * look ahead and lookbehind has had mixed results
      * moving to bison-esqu parser would relive this issue as we do not assign tokens additonal text which will 
      * be matched later.
      *  
      *
      *
      * *This currently does multiple passes matching one individual expression instead of poping 
      * input and evaulating with lookahead/behind against the entire lex then and poping onto a stack
      * This causes a large majority of our concurrent editing issues though we also have to be mindful
      * of stream input at that point and consuming based on a token needs.
      * 
      * uses css child selector to enforce certian element colors for comments and strings.
      * *
      */
    this.lex['&lt']                               = /</g; //mild sanitization
    this.lex['&gt']                               = />/g; // ^--
    this.lex[`<span class='token1'>\$&</span>`]   = /[=;{})(,:+-]|\!|\||\[|\]/gi; //this must be the first token generator
    this.lex[`<span class='token13'>\$&</span>`]  = /\/\/.*/g
    this.lex[`<span class='token15'>\$&</span>`]  = /(import|package).*/g
    this.lex[`<span class='token16'>\$&</span>`]  = /(?<=(class ))\w+/g
    this.lex[`<span class='token9'>\$&</span>`]   = /(?<=(public ))\w+/g 
    this.lex[`<span class='token10'>\$&</span>`]  = /(?<=(private ))\w+/g 
    this.lex[`<span class='token11'>\$&</span>`]  = /(?<=(static ))\w+/g 
    this.lex[`<span class='token12'>\$&</span>`]  = /(?<=(protected ))\w+/g  
    this.lex[`<span class='token2'>\$&</span>`]   = /public|private|protected|package/g;
    this.lex[`<span class='token3'>\$&</span>`]   = /(?<!\w)(Integer|boolean|Boolean|int|String|Date|long|Long|byte|Byte|char|Char)(?!\w)/g;
    this.lex[`<span class='token4'>\$&</span>`]   = /(^(\s|\d){4})|((?<=\n<\/span>)(\s|\d){4})|(\n(\s|\d){4})/g
    this.lex[`<span class='token5'>\$&</span>`]   = /@[\w\d]+/g;
    this.lex[`<span class='token6'>\$&</span>`]   = /(?<!\w)(if|for|new|return|void|extends|implements|console|System|else|try|catch)(?!\w)/g
    this.lex[`<span class='token7'>\$&</span>`]   = /(?<!\w)(this|super|switch|null|case|default|throws)(?!\w)/g
    this.lex[`<span class='token8'>\$&</span>`]   = /\.\w+/g 
    this.lex[`<span class='token14'>\$&</span>`]  = /\".*(?<!\\)\"/g
   
    // (?:[^\w\d])
    //(?:[^\w\d])
    // this.lex['public'] = '<span style="color:lightgreen">';
    // this.lex['private'] = '<span style="color:lightblue">';
    // this.lex['static'] = '<span style="color:lightpurple">';
    // this.lex['@column'] = '<span style="color:lightgrey">';
    // this.lex['import'] = '<span style="color:purple">';
    // this.lex['/@.+\/n/'] = '<span style="color:lightgrey">';
    
  }
}