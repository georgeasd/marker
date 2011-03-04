xquery version "1.0-ml";
(:

 Copyright 2010 MarkLogic Corporation 
 Copyright 2009 Ontario Council of University Libraries

 Licensed under the Apache License, Version 2.0 (the "License"); 
 you may not use this file except in compliance with the License. 
 You may obtain a copy of the License at 

        http://www.apache.org/licenses/LICENSE-2.0 

 Unless required by applicable law or agreed to in writing, software 
 distributed under the License is distributed on an "AS IS" BASIS, 
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 See the License for the specific language governing permissions and 
 limitations under the License. 
 


:)
module namespace util = "security:util";

(: 
 : @param $path /-prefixed string that is path to the XML file
 : that represents the document
 :
 : @return document read in from the give path, which is relative
 : to the current ML modules root
 :)
declare function util:get-doc($path as xs:string) as node() {
    let $root := xdmp:modules-root()
    return xdmp:document-get(fn:concat($root, $path))
};
