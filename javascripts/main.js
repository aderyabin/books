$(function(){

  var container = $('#books');

  container.imagesLoaded( function(){
    container.masonry({
      itemSelector : '.book',
      columnWidth: 250,
    });
  });
})