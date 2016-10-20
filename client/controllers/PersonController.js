/**
 * Created by imalonzo on 10/17/16.
 */


app.controller('PersonController', function($scope, PersonFactory) {
  console.log('Person Controller loaded');
  $scope.editMode = false;
  var editAttr = {};

  PersonFactory.index(function(data) {
    console.log(data);
    $scope.people = data;
  });
  $scope.field = function(attribute) {
    if (!editAttr._id) {
      editAttr._id = $scope.edit_person._id;
    }
    editAttr[attribute] = $scope.edit_person[attribute];

    console.log(editAttr);
  }
  //Submits the edit form so that we can edit the person
  $scope.editingPerson = function() {
    console.log($scope.edit_person);
    PersonFactory.update(editAttr, function() {
      PersonFactory.index(function(data) {
        console.log(data);
        $scope.people = data;
      });
    })
  }
  //Shows the person that we are trying to edit
  $scope.showPerson = function(data) {
    editAttr = {};
    console.log(data);
    $scope.editMode = true;

    $scope.edit_person = data
  }

  $scope.createPerson = function() {
    $scope.errors = {};
    console.log('Creating a person: Angular Controller');
    PersonFactory.create($scope.person, function(data) {
      if (data.errors) {
        console.log(data.errors);
        $scope.errors = data.errors;
      } else {
        PersonFactory.index(function(data) {
          $scope.people = data;

          $scope.person = {};
        });
      }
    })
  }

  $scope.deletePerson = function(data) {
    console.log('Deleting a person. :[');
    PersonFactory.delete(data, function() {
      PersonFactory.index(function(data) {
        $scope.people = data;
      });
    })
  }
})
