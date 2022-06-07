const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {  
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
  
    before(async () => {
      const testOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testOne.save();
  
      const testTwo = new Employee({ firstName: 'Emma', lastName: 'Cowell', department: 'Marketing' });
      await testTwo.save();
    });
    
    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });
  
    it('should return proper document by various params with findOne method', async () => {
      const employeeOne = await Employee.findOne({ firstName: 'John' });
      const expectedFirstName = 'John';

      const employeeTwo = await Employee.findOne({ department: 'Marketing' });
      const expectedDepartment = 'Marketing';

      expect(employeeOne.firstName).to.be.equal(expectedFirstName);
      expect(employeeTwo.department).to.be.equal(expectedDepartment);
    });
  
    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testOne = new Employee({firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testOne.save();
    
      const testTwo = new Employee({ firstName: 'Emma', lastName: 'Cowell', department: 'Marketing' });
      await testTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ 
          firstName: 'Emma', 
          lastName: 'Cowell', 
          department: 'Marketing' }, 
          { $set: { 
            firstName: 'Amanda', 
            lastName: 'Doe', 
            department: 'Testing' 
        }});

      const updatedData = await Employee.findOne({ firstName: 'Amanda', lastName: 'Doe', department: 'Testing' });
      expect(updatedData).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Emma', lastName: 'Cowell', department: 'Marketing' });
      employee.firstName = 'Amanda';
      employee.lastName = 'Doe';
      employee.department = 'Testing' 
      await employee.save();
    
      const updatedData = await Employee.findOne({ firstName: 'Amanda', lastName: 'Doe', department: 'Testing' });
      expect(updatedData).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
      const employees = await Employee.find({ firstName: 'Updated!' });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  
  });

  describe('Removing data', () => {

    beforeEach(async () => {
        const testOne = new Employee({firstName: 'John', lastName: 'Doe', department: 'IT' });
        await testOne.save();
      
        const testTwo = new Employee({ firstName: 'Emma', lastName: 'Cowell', department: 'Marketing' });
        await testTwo.save();
      });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      const removeData = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      expect(removeData).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await employee.remove();
      const removedData = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      expect(removedData).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  
  });
  
});