// namespace
var app = app || {};
var active = active || {};

// define 4 important parts
app.Model = Backbone.Model.extend({

});

Backbone.Model.idAttribute = "_id";

app.Collection = Backbone.Collection.extend({
  model: app.Model, // what type of models will the collection hold
  url: '/api',
  initialize: function() {
    var self = this;
    this.on('change', function() {
      console.log("Our collection has changed");
      var view = new app.CollectionView({
        collection: self
      });
    });
    this.on('sync', function() {
      console.log("Our collection synced with the API");
      var view = new app.CollectionView({
        collection: self
      });
    });
    // get data from API
    this.fetch();
  }
});



app.CollectionView = Backbone.View.extend({
  el: $('#pancake-listing'),
  initialize: function() {
    console.log('CollectionView is a go.');
    // when loaded, render immediately
    this.render();
  },
  render: function() {
    console.log('CollectionView is rendering');
    // we expect the CollectionView to be bound to a Collection
    var models = this.collection.models;
    for (var m in models) {
       new app.ModelView({
         model: models[m],
         el: this.el
       });
    }
  }
});

app.ModelView = Backbone.View.extend({
  initialize: function() {
    console.log("ModelView instantiated");
    this.render();
  },
  render: function() {
    console.log('ModelView rendering');
    var data = this.model.attributes;
    console.log('Grabbing template...');
    var template = $('#recipe-template').html();
    console.log('Transforming template...');
    var compileTpl = _.template(template);
    console.log('Creating HTML from template and model data...');
    var html = compileTpl(data);
    console.log('Rendering to page...');
    this.$el.append(html);
    // vanialla - this.el.innerHTML = this.el.innerHTML + html;
  }
});

// mongoDB support!
Backbone.Model.idAttribute = "_id";

// http://backbonejs.org/#History-start
Backbone.history.start();

// document is ready
$(document).ready(function() {

  active.collection = new app.Collection();

}); // END READY
