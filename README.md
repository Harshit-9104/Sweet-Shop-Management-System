# 🍬 Sweet Shop Management System

A JavaScript-based Sweet Shop Management System built following **Test-Driven Development (TDD)** principles. This system provides comprehensive inventory management, search functionality, and transaction handling for a sweet shop.

## 🎯 Features

### Core Operations
- ✅ **Add Sweet**: Add new sweets with validation
- ✅ **Delete Sweet**: Remove sweets by ID
- ✅ **View Sweets**: Display all available sweets
- ✅ **Search Sweets**: Search by name, category, or price range
- ✅ **Sort Sweets**: Sort by name, price, quantity, or category

### Inventory Management
- ✅ **Purchase Sweet**: Reduce stock with quantity validation
- ✅ **Restock Sweet**: Increase stock levels
- ✅ **Low Stock Alerts**: Identify items below threshold
- ✅ **Inventory Value**: Calculate total inventory worth

## 🧪 TDD Approach

This project follows strict Test-Driven Development principles:

1. **Red**: Write failing tests first
2. **Green**: Write minimal code to pass tests
3. **Refactor**: Improve code while keeping tests green

### Test Coverage
- ✅ Unit tests for all methods
- ✅ Edge case handling
- ✅ Error condition testing
- ✅ Input validation testing

## 📁 Project Structure

\`\`\`
sweet-shop/
├── src/
│   ├── Sweet.js          # Sweet model class
│   ├── SweetShop.js      # Main shop management class
│   └── index.js          # Demo and CLI interface
├── tests/
│   └── SweetShop.test.js # Comprehensive test suite
├── package.json          # Dependencies and scripts
└── README.md            # This file
\`\`\`

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd sweet-shop
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install --force
   \`\`\`

3. **Run tests**
   \`\`\`bash
   npm test
   \`\`\`

4. **Run with coverage**
   \`\`\`bash
   npm run test:coverage
   \`\`\`

5. **Start demo**
   \`\`\`bash
   npm start
   \`\`\`

## 📋 Usage Examples

### Basic Operations

\`\`\`javascript
const SweetShop = require('./src/SweetShop');

// Initialize shop
const shop = new SweetShop();

// Add a sweet
shop.addSweet({
  id: 1001,
  name: 'Kaju Katli',
  category: 'Nut-Based',
  price: 50,
  quantity: 20
});

// View all sweets
const allSweets = shop.viewSweets();
console.log(allSweets);

// Search by category
const milkSweets = shop.searchSweets({ category: 'Milk-Based' });

// Sort by price
const sortedByPrice = shop.sortSweets('price');

// Purchase sweet
shop.purchaseSweet(1001, 5);

// Restock sweet
shop.restockSweet(1001, 10);
\`\`\`

### Search Operations

\`\`\`javascript
// Search by name (partial match)
shop.searchSweets({ name: 'Kaju' });

// Search by category (exact match)
shop.searchSweets({ category: 'Milk-Based' });

// Search by price range
shop.searchSweets({ minPrice: 20, maxPrice: 50 });
\`\`\`

### Inventory Management

\`\`\`javascript
// Get total inventory value
const totalValue = shop.getTotalInventoryValue();

// Get low stock items (below 10 units)
const lowStock = shop.getLowStockItems(10);

// Get specific sweet by ID
const sweet = shop.getSweetById(1001);
\`\`\`

## 🧪 Testing

### Run Tests
\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
\`\`\`

### Test Structure
- **Sweet Class Tests**: Validation and object creation
- **CRUD Operations**: Add, delete, view functionality
- **Search & Sort**: All search criteria and sorting options
- **Inventory Management**: Purchase and restock operations
- **Error Handling**: Invalid inputs and edge cases

## 📊 Sample Data

The system comes with sample sweet data for testing:

\`\`\`javascript
[
  { id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 },
  { id: 1002, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 30, quantity: 15 },
  { id: 1003, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 50 },
  { id: 1004, name: 'Rasgulla', category: 'Milk-Based', price: 15, quantity: 30 },
  { id: 1005, name: 'Jalebi', category: 'Syrup-Based', price: 25, quantity: 25 }
]
\`\`\`

## 🔧 API Reference

### SweetShop Class Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| \`addSweet(sweetData)\` | Object | Boolean | Add new sweet to inventory |
| \`deleteSweet(id)\` | Number | Boolean | Remove sweet by ID |
| \`viewSweets()\` | None | Array | Get all sweets |
| \`searchSweets(criteria)\` | Object | Array | Search sweets by criteria |
| \`sortSweets(field)\` | String | Array | Sort sweets by field |
| \`purchaseSweet(id, quantity)\` | Number, Number | Boolean | Reduce stock |
| \`restockSweet(id, quantity)\` | Number, Number | Boolean | Increase stock |
| \`getSweetById(id)\` | Number | Object/null | Get specific sweet |
| \`getTotalInventoryValue()\` | None | Number | Calculate total value |
| \`getLowStockItems(threshold)\` | Number | Array | Get low stock items |

## 🚀 Future Enhancements

- [ ] Web-based frontend interface
- [ ] Database integration
- [ ] User authentication
- [ ] Sales reporting
- [ ] Supplier management
- [ ] Barcode scanning
- [ ] Multi-location support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Implement the feature
5. Ensure all tests pass
6. Submit a pull request

## 📝 Git Commit Convention

- ✅ \`git commit -m "✅ Test for addSweet method"\`
- 🚀 \`git commit -m "🚀 Implemented addSweet method"\`
- 🐛 \`git commit -m "🐛 Fixed quantity validation bug"\`
- 📚 \`git commit -m "📚 Updated README documentation"\`

## 📄 License

MIT License - feel free to use this project for learning and development purposes.

---

**Built with ❤️ using Test-Driven Development**

## 🌐 Web Interface

The system now includes a complete web-based frontend interface with the following features:

### Frontend Features
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **Real-time Updates**: Live inventory management
- ✅ **Interactive Dashboard**: Statistics and low stock alerts
- ✅ **Search & Filter**: Advanced search capabilities
- ✅ **Transaction Management**: Quick purchase and restock operations
- ✅ **Toast Notifications**: User-friendly feedback messages

### Web Interface Tabs
1. **Inventory**: View all sweets with sorting options
2. **Add Sweet**: Form to add new sweets to inventory
3. **Search**: Advanced search by name, category, and price range
4. **Transactions**: Quick purchase and restock operations
5. **Statistics**: Dashboard with inventory analytics

## 🚀 Complete Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Step-by-Step Setup

1. **Clone and Install**
   \`\`\`bash
   git clone <repository-url>
   cd sweet-shop
   npm install
   \`\`\`

2. **Run Tests (TDD Verification)**
   \`\`\`bash
   npm test
   npm run test:coverage
   \`\`\`

3. **Start the Web Server**
   \`\`\`bash
   npm run serve
   \`\`\`

4. **Access the Application**
   - Open your browser and go to: `http://localhost:3000`
   - API endpoints available at: `http://localhost:3000/api`

5. **Development Mode (Optional)**
   \`\`\`bash
   npm run dev
   \`\`\`
   This runs both the server and tests in watch mode.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm start` | Run console demo |
| `npm run serve` | Start web server |
| `npm run dev` | Development mode (server + test watch) |

## 🌐 API Endpoints

The system provides RESTful API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sweets` | Get all sweets |
| POST | `/api/sweets` | Add new sweet |
| DELETE | `/api/sweets/:id` | Delete sweet by ID |
| GET | `/api/sweets/search` | Search sweets |
| GET | `/api/sweets/sort/:field` | Sort sweets |
| POST | `/api/sweets/:id/purchase` | Purchase sweet |
| POST | `/api/sweets/:id/restock` | Restock sweet |
| GET | `/api/stats` | Get inventory statistics |

## 📱 Web Interface Usage

### Adding Sweets
1. Click on "Add Sweet" tab
2. Fill in the form with sweet details
3. Click "Add Sweet" button

### Managing Inventory
1. Go to "Inventory" tab
2. Use sort dropdown to organize sweets
3. Click action buttons on each sweet card:
   - **Buy**: Quick purchase
   - **Restock**: Add inventory
   - **Delete**: Remove sweet

### Searching
1. Navigate to "Search" tab
2. Enter search criteria:
   - Name (partial match)
   - Category (exact match)
   - Price range (min/max)
3. Click "Search" button

### Transactions
1. Go to "Transactions" tab
2. Enter Sweet ID and quantity
3. Click "Purchase" or "Restock"
4. View transaction history

### Statistics
1. Visit "Statistics" tab
2. View inventory value and item counts
3. Check low stock alerts
4. Monitor inventory health

## 🎯 Testing the Complete System

### Backend Testing
\`\`\`bash
npm test                    # Run all unit tests
npm run test:coverage      # Check test coverage
\`\`\`

### Frontend Testing
1. Start the server: `npm run serve`
2. Open `http://localhost:3000`
3. Test all tabs and functionality
4. Verify API responses in browser dev tools

### Integration Testing
1. Add sweets via web interface
2. Verify they appear in inventory
3. Test search and sort functionality
4. Perform purchase/restock operations
5. Check statistics updates

## 🔧 Troubleshooting

### Common Issues

**Port Already in Use**
\`\`\`bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
PORT=3001 npm run serve
\`\`\`

**API Connection Issues**
- Ensure server is running on `http://localhost:3000`
- Check browser console for error messages
- Verify API endpoints are accessible

**Test Failures**
\`\`\`bash
# Clear npm cache
npm cache clean --force
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --force
