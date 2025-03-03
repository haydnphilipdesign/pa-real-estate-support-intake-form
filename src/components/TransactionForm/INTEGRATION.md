
# Integrating the Transaction Form

This document explains how to integrate the transaction form into existing pages of your application.

## 1. Agent Portal Integration

### Step 1: Import the component

In your `AgentPortal.tsx` file, import the AgentPortalTransactionForm component:

```jsx
import AgentPortalTransactionForm from './components/AgentPortalTransactionForm';
```

### Step 2: Use the component in your Agent Portal

Add the component to your Agent Portal layout, passing the necessary props:

```jsx
// Inside your AgentPortal component
const [currentAgent, setCurrentAgent] = useState({
  id: "123", // Get this from your auth system
  name: "John Doe"
});

const handleTransactionSubmit = (data) => {
  // Handle the transaction submission - e.g., show a success message
  // or navigate to a different page
  console.log("Transaction submitted:", data);
};

// In your render method
return (
  <div className="agent-portal">
    <header>...</header>
    <div className="main-content">
      {/* Your other portal components */}
      
      {/* Add the transaction form */}
      <AgentPortalTransactionForm
        agent={currentAgent}
        onSubmissionComplete={handleTransactionSubmit}
      />
    </div>
  </div>
);
```

### Step 3: Add necessary styles

Make sure your global CSS includes the Tailwind styles needed for the form. If you're using a custom theme, you may need to adjust some colors in the form components.

## 2. Standalone Page Integration

If you want to create a standalone transaction form page:

### Step 1: Create a new page component

```jsx
// src/pages/TransactionSubmission.tsx
import React from 'react';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import { useNavigate } from 'react-router-dom';

const TransactionSubmissionPage = () => {
  const navigate = useNavigate();
  
  const handleFormComplete = (data) => {
    console.log("Transaction submitted:", data);
    // Navigate to a thank you or confirmation page
    navigate('/thank-you');
  };
  
  return (
    <div className="transaction-submission-page">
      <header className="bg-primary text-white p-4">
        <h1 className="text-2xl font-bold">Submit New Transaction</h1>
      </header>
      
      <main className="container mx-auto py-8">
        <TransactionForm 
          onComplete={handleFormComplete}
          logo="/optimized/logo.png"
        />
      </main>
    </div>
  );
};

export default TransactionSubmissionPage;
```

### Step 2: Add the route to your router

In your router configuration (src/router.tsx or App.tsx):

```jsx
import TransactionSubmissionPage from './pages/TransactionSubmission';

// In your routes definition
<Routes>
  {/* Your existing routes */}
  <Route path="/submit-transaction" element={<TransactionSubmissionPage />} />
</Routes>
```

## 3. Environment Setup

Make sure to set up the Airtable environment variables in your project's main .env file:

```
VITE_AIRTABLE_API_KEY=your_airtable_api_key_here
VITE_AIRTABLE_BASE_ID=your_airtable_base_id_here
VITE_AIRTABLE_TRANSACTIONS_TABLE_ID=your_transactions_table_id_here
VITE_AIRTABLE_CLIENTS_TABLE_ID=your_clients_table_id_here
```

## 4. Styling Considerations

The form uses Tailwind CSS for styling. Make sure your project has Tailwind configured. You may need to merge the Tailwind configuration from the form with your existing configuration if there are conflicts.

If your project uses a different styling approach, you may need to adjust the component styles accordingly.
