
# Integration Guide for Transaction Form

This guide explains how to integrate the PA Real Estate Transaction Form into your existing React project.

## Automated Installation

We've provided an installation script to automate the process. Run:

```bash
node src/components/TransactionForm/install.js
```

This script will:
1. Copy all necessary files to the appropriate directories
2. Check for required dependencies
3. Provide setup instructions

## Manual Installation

If you prefer to install manually, follow these steps:

### 1. Copy Required Files

Copy the following directories from `src/components/TransactionForm/src/` to your project:

- `components/*` → `src/components/TransactionForm/`
- `hooks/*` → `src/hooks/`
- `utils/*` → `src/utils/`
- `types/*` → `src/types/`

Also copy:
- `TransactionForm.tsx` → `src/components/TransactionForm.tsx`
- `PortalTransactionForm.tsx` → `src/components/PortalTransactionForm.tsx`
- `.env.example` → root directory

### 2. Install Dependencies

Ensure you have these dependencies installed:

```bash
npm install @tanstack/react-query airtable framer-motion lucide-react
```

### 3. Configure Environment Variables

Copy the environment variables from `.env.example` to your project's `.env` file and fill in your Airtable credentials.

```
VITE_AIRTABLE_API_KEY=your_airtable_api_key_here
VITE_AIRTABLE_BASE_ID=your_airtable_base_id_here
VITE_AIRTABLE_TRANSACTIONS_TABLE_ID=your_transactions_table_id_here
VITE_AIRTABLE_CLIENTS_TABLE_ID=your_clients_table_id_here
```

### 4. Import and Use the Form

#### As a standalone form:

```jsx
import { TransactionForm } from './components/TransactionForm/TransactionForm';

function YourComponent() {
  return (
    <TransactionForm 
      onComplete={(data) => console.log('Form submitted:', data)}
      logo="/path/to/your/logo.png"
      className="custom-styles"
    />
  );
}
```

#### Within an agent portal:

```jsx
import { PortalTransactionForm } from './components/TransactionForm/PortalTransactionForm';

function AgentPortalPage() {
  const handleSubmit = (formData) => {
    // Handle the form submission in your application
    console.log('Transaction submitted:', formData);
  };

  return (
    <PortalTransactionForm 
      onFormSubmit={handleSubmit}
      logo="/path/to/your/logo.png"
      className="custom-styles"
    />
  );
}
```

#### If you already have an AgentPortal component:

```jsx
import { AgentPortalTransactionForm } from './components/AgentPortalTransactionForm';

function AgentPortal() {
  const agentId = "agent-123"; // Get from your authentication system
  
  const handleSubmit = (formData) => {
    // Handle the form submission in your application
    console.log('Transaction submitted:', formData);
  };

  return (
    <div className="agent-portal">
      {/* ... your existing UI */}
      <AgentPortalTransactionForm 
        onFormSubmit={handleSubmit}
        agentId={agentId}
        logo="/path/to/your/logo.png"
        className="custom-styles"
      />
    </div>
  );
}
```

## Props

### TransactionForm

- `onComplete`: Callback function that receives the form data after successful submission
- `logo`: Path to your logo image (defaults to the PA Real Estate Support Services logo)
- `className`: Additional CSS classes to apply to the form container

### PortalTransactionForm & AgentPortalTransactionForm

- `onFormSubmit`: Callback function that receives the enriched form data
- `agentId`: ID of the current agent (for tracking submissions)
- `logo`: Path to your logo image
- `className`: Additional CSS classes to apply to the form container

## CSS Integration

The form relies on Tailwind CSS. If your project uses Tailwind, ensure your configuration includes the necessary classes. If not, you may need to include the prebuilt CSS file:

```jsx
import './components/TransactionForm/styles.css';
```

## Styling Customization

To customize the form styling or behavior, you can modify the individual component files or override styles through the `className` prop.

## Airtable Configuration

Ensure your Airtable base has:
- A table for Transactions
- A table for Clients

The field mappings in `src/utils/airtable.ts` may need to be updated if your Airtable field IDs differ from the default configuration.

## Troubleshooting

If you encounter import errors:
- Ensure all path references are correct for your project structure
- Make sure all dependencies are installed
- Check that component names match their file names
