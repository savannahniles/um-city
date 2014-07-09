window.onload = function() {

  //set the group name: blonde_cop or brunette
  UMevents.clientname("umcity-rockstar");

  getCollection = function(collectionName){
    console.log (collections);
    if (collectionName === "News Room") {
        return collections[0];
    }
    else if (collectionName === "SciFi") {
        return collections[1];
    }
    else if (collectionName === "Vivian's House") {
        return collections[2];
    }
  };

  getPeople = function(peopleArray){
    p = [];
    for (var i in peopleArray) {
      console.log(peopleArray[i]);
      if (peopleArray[i] === "andy") {
          p.push(allPeople[0]);
      }
      else if (peopleArray[i] === "black_hat") {
          p.push(allPeople[1]);
      }
      else if (peopleArray[i] === "black_stache") {
          p.push(allPeople[2]);
      }
      else if (peopleArray[i] === "blonde_cop") {
          p.push(allPeople[3]);
      }
      else if (peopleArray[i] === "brunette") {
          p.push(allPeople[4]);
      }
      else if (peopleArray[i] === "devo") {
          p.push(allPeople[5]);
      }
      else if (peopleArray[i] === "knight") {
          p.push(allPeople[6]);
      }
    }
    console.log(p);
    return p;
  };

  fillMatrix = function(collection, people) {
    //fade out top nav and start changes on finish
    $("#topNav").fadeOut(200, function() {

      //switch out matrix
      //var temp = "<div class='cell' style='width:{width}px; height: {height}px; background-image: url(i/photo/{index}.jpg)'></div>";
      //that's how you might start to fill these with images dynamically
      var temp = "<div class='cell' style='width:{width}px; height: {height}px; background-color: {color}; background-image: url({imageURL})'><div class='cellInfo'><h1 style='background-color: {color};'>{title}</h1><h2 style='background-color: {color};'>{subtitle}</h2></div></div>";
      elementsCount = collection.renderObjects.length;
      var html = '';
      for (var i = 0; i < elementsCount; ++i) {
        var w = collection.renderObjects[i].imageWidth, 
            h = collection.renderObjects[i].imageHeight,
            imageURL = collection.renderObjects[i].imageURL,
            color = collection.renderObjects[i].color,
            title = collection.renderObjects[i].name,
            subtitle = collection.renderObjects[i].subtitle;
            subtitle = (collection.renderObjects[i].subtitle) ? collection.renderObjects[i].subtitle : "";
        html += temp.replace(/\{height\}/g, h)
          .replace(/\{width\}/g, w)
          .replace("{imageURL}", imageURL)
          .replace("{color}", color)
          .replace("{color}", color)
          .replace("{color}", color)
          .replace("{title}", title)
          .replace("{subtitle}", subtitle);
      }
      $("#matrix").html(html);

      //change topNav data
      $("#collectionName").html(collection.name);
      html = ''
      var temp = "<li><img class='icon' src={imageURL}></li>";
      for (var i in people) {
        imageURL = people[i].imageURL
        html += temp.replace(/\{imageURL\}/g, imageURL);
      }
      $('#iconList').html(html);

      var matrix = new freewall("#matrix");
      matrix.reset({
        selector: '.cell',
        animate: false,
        cellW: 200,
        cellH: 200,
        delay: 50,
        onResize: function() {
          matrix.fitWidth();
        }
      });
      matrix.fitWidth();
      $("#topNav").fadeIn();
    });
  };

  changeCollection = function(collection, people){
    console.log ("changing collection...");
    $("#matrix").empty();
    fillMatrix(getCollection(collection), getPeople(people));
  };

  UMevents.on('changeCollection', function(e) {
      console.log (e.type);
      console.log (e.name);
      console.log (e.data);

      var data = e.data.split("/")
      collection = data[0]
      people = data[1].split(",")
      
      changeCollection(collection, people);
  });

  gestureReset_rockstar = function() {
    var gestureData = "News Room/blonde_cop,black_stache"
    UMevents.emit('changeCollection', gestureData);
  };

  gestureReset_lady = function() {
    var gestureData = "SciFi/black_hat,andy,brunette"
    UMevents.emit('changeCollection', gestureData);
  };

  gesture1_rockstar = function() {
    var gestureData = "News Room/blonde_cop,black_stache,devo"
    UMevents.emit('changeCollection', gestureData);
  };

  gesture2_rockstar = function() {
    var gestureData = "News Room/blonde_cop,black_stache,brunette"
    UMevents.emit('changeCollection', gestureData);
  };

  gesture2_lady = function() {
    var gestureData = "News Room/blonde_cop,black_stache,brunette"
    UMevents.emit('changeCollection', gestureData);
  };

  gesture3_rockstar = function() {
    var gestureData = "Vivian's House/blonde_cop,brunette"
    UMevents.emit('changeCollection', gestureData);
  };

  gesture3_lady = function() {
    var gestureData = "Vivian's House/blonde_cop,brunette"
    UMevents.emit('changeCollection', gestureData);
  };

  changeCollection("Vivian's House", ["andy", "knight", "blonde_cop"]);


}