# jquery-sticky-table-header
A tiny jQuery plugin that makes the header stay sticky on scroll.

This is a small jQuery plugin that fixes tables so that the header stays fixed while the body scrolls. 
This is a common problem with HTML tables and there exist other libraries that do this as well. 

The advantage of the approach that this library takes is that it doesn't make any assumptions about table width. 
A different approach I've seen is to set fixed widths between a header table and separate body table.
This library differs from that in that it maintains the relationship between the header and body. 
This was based on a js fiddle from stackoverflow user D-Pixie. But this expands on his work so that the html 
changes are not done until the page is loaded thus making implementation simpler and keeping your html free from cruft.

Along with the small js plugin file in this repro is a small demo.

This approach has not been tested in IE < 10 and as such I would assume it doesn't work in legacy IE browsers. This has been tested in Chrome 46, Firefox 41 and IE 10/11. 
