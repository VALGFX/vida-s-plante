import dbConnect from '';
import userModel from '../../models/userModel';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const exists = await userModel.findOne({ email });
        return res.status(200).json({ exists: !!exists });
    } catch (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
