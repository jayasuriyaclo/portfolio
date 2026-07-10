const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const nodemailer = require('nodemailer');
require('dotenv').config();

const propertyId = process.env.GA4_PROPERTY_ID;
const client = new BetaAnalyticsDataClient();

async function runReport() {
  if (!propertyId) {
    console.warn("GA4_PROPERTY_ID is missing. Skipping report generation.");
    return;
  }
  
  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        { name: 'eventName' },
        { name: 'pagePath' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'eventCount' },
      ],
    });

    let reportText = '🚀 Monthly Portfolio Analytics Report\n\n';
    reportText += 'Last 30 Days Traffic and Conversion Data:\n';
    reportText += '--------------------------------------------------\n';
    
    response.rows.forEach(row => {
      reportText += `Page: ${row.dimensionValues[1].value} | Event: ${row.dimensionValues[0].value} | Users: ${row.metricValues[0].value} | Events: ${row.metricValues[1].value}\n`;
    });

    console.log(reportText);

    // If email is configured, send the report
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_TO) {
      let transporter = nodemailer.createTransport({
        service: 'gmail', // You can change this to your email provider
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: `"Portfolio Analytics" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: 'Monthly Portfolio Analytics Report',
        text: reportText
      });
      
      console.log('Email sent successfully!');
    }
  } catch (error) {
    console.error('Error fetching GA4 data or sending email:', error);
  }
}

runReport();
