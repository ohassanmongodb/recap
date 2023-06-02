await function saveReport(event) {
    event.preventDefault();


    // Create a new Realm app
    const appId = 'recap-zzkqk';
    const app = new Realm.App({ id: appId });

    // Authenticate the user anonymously
    const credentials = Realm.Credentials.anonymous();
    const user =  app.logIn(credentials);

    // Access the MongoDB collection
    const mongodb = user.mongoClient('mongodb-atlas');
    const collection = mongodb.db('report').collection('customers');

    user.then( d => console.log(d));

    const form = document.getElementById('reportForm');
    const customer = form.customer.value;
    const newCustomer = form['new-customer'].value;
    const report = form.report.value;

    // Prepare the document to be saved
    const document = {
      customer: customer || newCustomer,
      report: report
    };

    try {
      // Insert the document into the collection
        collection.insertOne(document).then(
            d => console.log('Report saved successfully!')
        );
      form.reset();
    } catch (error) {
      console.error('Error saving report:', error);
    } finally {
      // Log out the user to end the Realm session
      user.logOut().then( d => console.log("logouts"));
    }
  }