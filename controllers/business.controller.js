
const Business = require('../models/business');
const User = require('../models/UserModel');

exports.createBusiness = async (req,res)=>{
    
    try {
        const { name, description, location, contact, category } = req.body;
        
        const userId = req.user.id; // Extract the logged-in user's ID from the request
    
    //     // Create a new business
        const newBusiness = new Business({
          name,
          description,
          location,
          contact,
          category,
          owner: userId
        });
    
        const savedBusiness = await newBusiness.save();
    
        // Update the user's businesses array
        await User.findByIdAndUpdate(
          userId,
          { $push: { businesses: savedBusiness._id } }, // Add business ID to the array
          { new: true, runValidators: true }
        );
    
        res.status(201).json(savedBusiness);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

}

exports.getBusiness= async(req,res)=>{
    try {
        const userId = req.user.id;
    
        const user = await User.findById(userId).populate('businesses');
        const business = user.businesses
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        res.status(200).json(business);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

exports.updateBusiness = async(req,res)=>{
    try {
        const businessId = req.params.id;
        res.send(businessId)
        const userId = req.user.id; // Logged-in user ID
        const { name, description, location, contact, category } = req.body;
    
        // Find the business and ensure the user owns it
        const business = await Business.findById(businessId);
        if (!business) {
          return res.status(404).json({ message: 'Business not found' });
        }
        if (business.owner.toString() !== userId) {
          return res.status(403).json({ message: 'Access denied' });
        }
    
        // Update the business details
        business.name = name || business.name;
        business.description = description || business.description;
        business.location = location || business.location;
        business.contact = contact || business.contact;
        business.category = category || business.category;
    
        const updatedBusiness = await business.save();
    
        res.status(200).json(updatedBusiness);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }


};

exports.deleteBusiness = async(req,res)=>{
    try {
        const businessId = req.params.id;
        const userId = req.user.id; // Logged-in user ID
    
        // Find the business and ensure the user owns it
        const business = await Business.findById(businessId);
        if (!business) {
          return res.status(404).json({ message: 'Business not found' });
        }
        if (business.owner.toString() !== userId) {
          return res.status(403).json({ message: 'Access denied' });
        }
    
        // Delete the business
        await Business.findByIdAndDelete(businessId);
    
        // Remove the business ID from the user's businesses array
        await User.findByIdAndUpdate(
          userId,
          { $pull: { businesses: businessId } }, // Remove the business ID
          { new: true }
        );
    
        res.status(200).json({ message: 'Business deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}