const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Load environment variables
const API_URL = 'https://qaapi.paykoko.com/api/merchants/orderCreate';
const API_KEY = process.env.KOKO_API_KEY;
const MERCHANT_ID = process.env.KOKO_MERCHANT_ID;
const RETURN_URL = process.env.KOKO_RETURN_URL;
const CANCEL_URL = process.env.KOKO_CANCEL_URL;
const RESPONSE_URL = process.env.KOKO_RESPONSE_URL;

// Load private key from PEM file
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../keys/private.pem'), 'utf-8');

// Optional: load public key if needed later for response verification
// const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../keys/public.pem'), 'utf-8');

const PLUGIN_NAME = 'customapi';
const PLUGIN_VERSION = '1.0.1';
const CURRENCY = 'LKR';

exports.createKokoOrder = async (req, res) => {
  try {
    const { firstName, lastName, email, amount, orderId, description } = req.body;

    if (!firstName || !lastName || !email || !amount || !orderId || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Build the dataString in Koko's required order
    const dataString = MERCHANT_ID + amount + CURRENCY + PLUGIN_NAME + PLUGIN_VERSION +
      RETURN_URL + CANCEL_URL + orderId + orderId + firstName + lastName + email +
      description + API_KEY + RESPONSE_URL;

    // Create RSA-SHA1 signature
    const signer = crypto.createSign('RSA-SHA1');
    signer.update(dataString);
    const signature = signer.sign(PRIVATE_KEY, 'base64');

    // Construct the request payload
    const params = new URLSearchParams({
      _mId: MERCHANT_ID,
      api_key: API_KEY,
      _returnUrl: RETURN_URL,
      _cancelUrl: CANCEL_URL,
      _responseUrl: RESPONSE_URL,
      _amount: amount,
      _currency: CURRENCY,
      _reference: orderId,
      _orderId: orderId,
      _pluginName: PLUGIN_NAME,
      _pluginVersion: PLUGIN_VERSION,
      _description: description,
      _firstName: firstName,
      _lastName: lastName,
      _email: email,
      dataString: dataString,
      signature: signature,
    });

    // Send the request to Koko
    const response = await axios.post(API_URL, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Return Koko's response
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Koko API Error:', error?.response?.data || error.message);
    res.status(500).json({
      message: 'Koko API request failed',
      error: error?.response?.data || error.message,
    });
  }
};
