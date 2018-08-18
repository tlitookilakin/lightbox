# lightbox v1.5
An easy-to-use, customizable, and powerful lightbox plugin.

How to use:
include the script on your page, and run it ONCE using setupLightbox()

## Arguments/settings:
### targetElement
A CSS selector string for the element that contains images you want the lightbox to work with. there should be only one of these, if you have multiple, use the highest common ancestor. if you want it to work on the whole page, just use "body".
### ignoreClasses
A string containing a comma-separated list of class names to not add the lightbox to. An empty string ("") may be used to not select any class names.
### showMeta
A boolean (true/false) determining whether or not the lightbox should display detected image information. (see below for more details.)
### showTitles
A boolean (true/false) determining whether or not detected titles should be displayed. This uses the "title" attribute of the image.

## Defining how the lightbox interacts with a specific image or image set
### data-lighbox attribute
On images, this may have one of three values, "none", "panorama", or "default". if this is not specified, it will assume a value of "default." "none" causes the image to be ignored by the plugin. "panorama" causes the image to be viewed as a panorama image, which shows a horizontally pannable section of the full image. "default" works as normal.
Additionally, any element containing images may have this attribute set to "group", which will cause all images contained within that element to act as an image set. (Note that this includes ALL valid descendants of the element, not only direct children. Because of this, nesting 'groups' may produce unintended results.) Panorama mode is not currently compatible with group mode.
### data-altsrc attribute
If this attribute is included on an image, it will use this value as the URL for the "full-sized" version of the image, allowing you to use smaller or cropped versions of an image on the page and display the full version when viewed in the lightbox.
### adding image information/captions
This relies on the presence of a `<figcaption>` element, and will treat its contents as an image caption. The relevant `<figcaption>` element must be placed directly following the corresponding image if it is an individual caption and not a group caption. For group captions, the images should be placed together in a `<figure>`, and the corresponding `<figcaption>` should be either the first or last element in the `<figure>`.
  
## Additional notes:
Keyboard navigation of image groups also works. you can use the A/D and LEFT/RIGHT keys to navigate them.
