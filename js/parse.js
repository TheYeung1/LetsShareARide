Parse.initialize("rPQRW5wtH4rVCqfdct9GNTazYwqaT9sz6Q3ruMtx", "gS8l1mBqn6ruoxsZLHIcU4QlXOGq5WGd26w11sof");
    
var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
  testObject.save({foo: "bar"}, {
  success: function(object) {
    console.log("success!");
  },
  error: function(model, error) {
    console.log("failure");
  }
});