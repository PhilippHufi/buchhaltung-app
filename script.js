class BookkeepingApp {
    constructor() {
        this.accounts = [];
        this.transactions = [];
        this.receipts = [];
        this.init();
    }

    init() {
        this.loadData();
        this.loadDefaultAccounts();
        this.bindEvents();
        this.updateAccountDropdowns();
        this.renderAccounts();
        this.renderTransactions();
        this.renderBalance();
        this.renderReceipts();
    }

    loadDefaultAccounts() {
        if (this.accounts.length === 0) {
            const defaultAccounts = [
                { name: 'Kasse', type: 'Aktiva' },
                { name: 'Bank', type: 'Aktiva' },
                { name: 'Forderungen', type: 'Aktiva' },
                { name: 'Verbindlichkeiten', type: 'Passiva' },
                { name: 'Eigenkapital', type: 'Eigenkapital' },
                { name: 'Umsatzerlöse', type: 'Erlöse' },
                { name: 'Büroaufwand', type: 'Aufwendungen' },
                { name: 'Mietaufwand', type: 'Aufwendungen' },
                { name: 'Reisekosten', type: 'Aufwendungen' },
                { name: 'Bewirtung', type: 'Aufwendungen' }
            ];

            defaultAccounts.forEach(account => {
                this.accounts.push(account);
            });
        }
    }

    bindEvents() {
        document.getElementById('account-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addAccount();
        });

        document.getElementById('transaction-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });

        document.getElementById('receipt-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.processReceipt();
        });

        document.getElementById('receipt-to-transaction-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createTransactionFromReceipt();
        });

        document.getElementById('date').value = new Date().toISOString().split('T')[0];
    }

    addAccount() {
        const name = document.getElementById('account-name').value;
        const type = document.getElementById('account-type').value;

        if (this.accounts.find(acc => acc.name === name)) {
            alert('Konto existiert bereits!');
            return;
        }

        this.accounts.push({ name, type });
        this.updateAccountDropdowns();
        this.renderAccounts();
        this.renderBalance();
        this.saveData();
        
        document.getElementById('account-form').reset();
    }

    addTransaction() {
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        const debitAccount = document.getElementById('debit-account').value;
        const creditAccount = document.getElementById('credit-account').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (debitAccount === creditAccount) {
            alert('Soll- und Haben-Konto müssen unterschiedlich sein!');
            return;
        }

        this.transactions.push({
            id: Date.now(),
            date,
            description,
            debitAccount,
            creditAccount,
            amount
        });

        this.renderTransactions();
        this.renderBalance();
        this.saveData();
        
        document.getElementById('transaction-form').reset();
        document.getElementById('date').value = new Date().toISOString().split('T')[0];
    }

    updateAccountDropdowns() {
        const debitSelect = document.getElementById('debit-account');
        const creditSelect = document.getElementById('credit-account');
        
        debitSelect.innerHTML = '<option value="">Konto auswählen</option>';
        creditSelect.innerHTML = '<option value="">Konto auswählen</option>';

        this.accounts.forEach(account => {
            const option1 = document.createElement('option');
            option1.value = account.name;
            option1.textContent = account.name;
            debitSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = account.name;
            option2.textContent = account.name;
            creditSelect.appendChild(option2);
        });
    }

    renderAccounts() {
        const tbody = document.getElementById('accounts-tbody');
        tbody.innerHTML = '';

        this.accounts.forEach(account => {
            const balance = this.getAccountBalance(account.name);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${account.name}</td>
                <td>${account.type}</td>
                <td class="${balance >= 0 ? 'positive' : 'negative'}">€${balance.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    renderTransactions() {
        const tbody = document.getElementById('transactions-tbody');
        tbody.innerHTML = '';

        this.transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(transaction.date).toLocaleDateString('de-DE')}</td>
                <td>${transaction.description}</td>
                <td>${transaction.debitAccount}</td>
                <td>${transaction.creditAccount}</td>
                <td>€${transaction.amount.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    getAccountBalance(accountName) {
        let balance = 0;
        const account = this.accounts.find(acc => acc.name === accountName);
        
        if (!account) return 0;

        this.transactions.forEach(transaction => {
            if (transaction.debitAccount === accountName) {
                if (account.type === 'Aktiva' || account.type === 'Aufwendungen') {
                    balance += transaction.amount;
                } else {
                    balance -= transaction.amount;
                }
            }
            if (transaction.creditAccount === accountName) {
                if (account.type === 'Aktiva' || account.type === 'Aufwendungen') {
                    balance -= transaction.amount;
                } else {
                    balance += transaction.amount;
                }
            }
        });

        return balance;
    }

    renderBalance() {
        const assets = document.getElementById('assets');
        const liabilities = document.getElementById('liabilities');
        const equity = document.getElementById('equity');
        const profitLoss = document.getElementById('profit-loss-content');

        assets.innerHTML = '';
        liabilities.innerHTML = '';
        equity.innerHTML = '';
        profitLoss.innerHTML = '';

        let totalAssets = 0;
        let totalLiabilities = 0;
        let totalEquity = 0;
        let totalRevenue = 0;
        let totalExpenses = 0;

        this.accounts.forEach(account => {
            const balance = this.getAccountBalance(account.name);
            
            if (balance !== 0) {
                const item = document.createElement('div');
                item.className = 'account-item';
                item.innerHTML = `
                    <span>${account.name}</span>
                    <span class="${balance >= 0 ? 'positive' : 'negative'}">€${Math.abs(balance).toFixed(2)}</span>
                `;

                switch (account.type) {
                    case 'Aktiva':
                        assets.appendChild(item);
                        totalAssets += balance;
                        break;
                    case 'Passiva':
                        liabilities.appendChild(item);
                        totalLiabilities += balance;
                        break;
                    case 'Eigenkapital':
                        equity.appendChild(item);
                        totalEquity += balance;
                        break;
                    case 'Erlöse':
                        const revenueItem = document.createElement('div');
                        revenueItem.className = 'account-item';
                        revenueItem.innerHTML = `
                            <span>${account.name}</span>
                            <span class="positive">€${balance.toFixed(2)}</span>
                        `;
                        profitLoss.appendChild(revenueItem);
                        totalRevenue += balance;
                        break;
                    case 'Aufwendungen':
                        const expenseItem = document.createElement('div');
                        expenseItem.className = 'account-item';
                        expenseItem.innerHTML = `
                            <span>${account.name}</span>
                            <span class="negative">€${balance.toFixed(2)}</span>
                        `;
                        profitLoss.appendChild(expenseItem);
                        totalExpenses += balance;
                        break;
                }
            }
        });

        const profit = totalRevenue - totalExpenses;
        const profitItem = document.createElement('div');
        profitItem.className = 'account-item';
        profitItem.style.fontWeight = 'bold';
        profitItem.style.borderTop = '2px solid #333';
        profitItem.innerHTML = `
            <span>Gewinn/Verlust</span>
            <span class="${profit >= 0 ? 'positive' : 'negative'}">€${profit.toFixed(2)}</span>
        `;
        profitLoss.appendChild(profitItem);

        const assetTotal = document.createElement('div');
        assetTotal.className = 'account-item';
        assetTotal.style.fontWeight = 'bold';
        assetTotal.style.borderTop = '2px solid #333';
        assetTotal.innerHTML = `
            <span>Gesamt Aktiva</span>
            <span class="positive">€${totalAssets.toFixed(2)}</span>
        `;
        assets.appendChild(assetTotal);

        const liabilityTotal = document.createElement('div');
        liabilityTotal.className = 'account-item';
        liabilityTotal.style.fontWeight = 'bold';
        liabilityTotal.style.borderTop = '2px solid #333';
        liabilityTotal.innerHTML = `
            <span>Gesamt Passiva</span>
            <span class="positive">€${totalLiabilities.toFixed(2)}</span>
        `;
        liabilities.appendChild(liabilityTotal);

        const equityTotal = document.createElement('div');
        equityTotal.className = 'account-item';
        equityTotal.style.fontWeight = 'bold';
        equityTotal.style.borderTop = '2px solid #333';
        equityTotal.innerHTML = `
            <span>Gesamt Eigenkapital</span>
            <span class="positive">€${(totalEquity + profit).toFixed(2)}</span>
        `;
        equity.appendChild(equityTotal);
    }

    loadData() {
        const savedAccounts = localStorage.getItem('bookkeeping-accounts');
        const savedTransactions = localStorage.getItem('bookkeeping-transactions');
        
        if (savedAccounts) {
            this.accounts = JSON.parse(savedAccounts);
        }
        
        if (savedTransactions) {
            this.transactions = JSON.parse(savedTransactions);
        }

        const savedReceipts = localStorage.getItem('bookkeeping-receipts');
        if (savedReceipts) {
            this.receipts = JSON.parse(savedReceipts);
        }
    }

    saveData() {
        localStorage.setItem('bookkeeping-accounts', JSON.stringify(this.accounts));
        localStorage.setItem('bookkeeping-transactions', JSON.stringify(this.transactions));
        localStorage.setItem('bookkeeping-receipts', JSON.stringify(this.receipts));
    }

    async processReceipt() {
        const fileInput = document.getElementById('receipt-image');
        const file = fileInput.files[0];
        
        if (!file) {
            alert('Bitte wählen Sie ein Bild aus');
            return;
        }

        const previewDiv = document.getElementById('receipt-preview');
        const previewImg = document.getElementById('preview-image');
        const extractedDataDiv = document.getElementById('extracted-data');
        
        previewDiv.style.display = 'block';
        
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            this.extractDataFromReceipt(e.target.result, file);
        };
        reader.readAsDataURL(file);
    }

    extractDataFromReceipt(imageData, file) {
        const extractedDataDiv = document.getElementById('extracted-data');
        extractedDataDiv.innerHTML = '<div class="loading">Rechnung wird verarbeitet...</div>';

        setTimeout(() => {
            const mockData = this.simulateOCR(file.name);
            
            extractedDataDiv.innerHTML = `
                <h4>Extrahierte Daten</h4>
                <p><strong>Datum:</strong> ${mockData.date}</p>
                <p><strong>Beschreibung:</strong> ${mockData.description}</p>
                <p><strong>Betrag:</strong> €${mockData.amount}</p>
                <p><strong>Kategorie:</strong> ${mockData.category}</p>
            `;

            document.getElementById('receipt-date').value = mockData.date;
            document.getElementById('receipt-description').value = mockData.description;
            document.getElementById('receipt-amount').value = mockData.amount;
            document.getElementById('receipt-category').value = mockData.category;
            
            document.getElementById('receipt-transaction-form').style.display = 'block';
            
            this.currentReceiptData = {
                id: Date.now(),
                imageData: imageData,
                fileName: file.name,
                extractedData: mockData,
                processed: false
            };
        }, 2000);
    }

    simulateOCR(fileName) {
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        
        const mockData = [
            { date: dateStr, description: 'Büromaterial - Staples', amount: '45.67', category: 'Büroaufwand' },
            { date: dateStr, description: 'Tankstelle - Shell', amount: '89.32', category: 'Reisekosten' },
            { date: dateStr, description: 'Restaurant - Geschäftsessen', amount: '125.50', category: 'Bewirtung' },
            { date: dateStr, description: 'Büroausstattung - Schreibtisch', amount: '299.99', category: 'Büroaufwand' },
            { date: dateStr, description: 'Internetrechnung - Telekom', amount: '59.99', category: 'Büroaufwand' }
        ];
        
        return mockData[Math.floor(Math.random() * mockData.length)];
    }

    createTransactionFromReceipt() {
        const date = document.getElementById('receipt-date').value;
        const description = document.getElementById('receipt-description').value;
        const amount = parseFloat(document.getElementById('receipt-amount').value);
        const category = document.getElementById('receipt-category').value;

        this.transactions.push({
            id: Date.now(),
            date,
            description,
            debitAccount: category,
            creditAccount: 'Bank',
            amount
        });

        this.currentReceiptData.processed = true;
        this.currentReceiptData.transactionId = this.transactions[this.transactions.length - 1].id;
        this.receipts.push(this.currentReceiptData);

        this.renderTransactions();
        this.renderBalance();
        this.renderReceipts();
        this.saveData();

        document.getElementById('receipt-form').reset();
        document.getElementById('receipt-preview').style.display = 'none';
        document.getElementById('receipt-transaction-form').style.display = 'none';
        
        alert('Rechnung gespeichert und Transaktion erstellt!');
    }

    renderReceipts() {
        const gallery = document.getElementById('receipts-gallery');
        gallery.innerHTML = '';

        this.receipts.forEach(receipt => {
            const receiptItem = document.createElement('div');
            receiptItem.className = 'receipt-item';
            receiptItem.innerHTML = `
                <img src="${receipt.imageData}" alt="${receipt.fileName}">
                <h4>${receipt.extractedData.description}</h4>
                <p>${new Date(receipt.extractedData.date).toLocaleDateString('de-DE')}</p>
                <p class="amount">€${receipt.extractedData.amount}</p>
                <p>${receipt.extractedData.category}</p>
                <p style="font-size: 12px; color: #999;">${receipt.fileName}</p>
            `;
            gallery.appendChild(receiptItem);
        });
    }
}

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
    new BookkeepingApp();
});