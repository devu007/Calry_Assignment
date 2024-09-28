const express = require('express'); 
import { Request, Response } from 'express'; 
const bodyParser = require('body-parser');
import * as fs from 'fs-extra'; 
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const REQUESTS_FILE = './data/requests.json';

// Define the type for a request object
interface ServiceRequest {
    id: string;
    guestName: string;
    roomNumber: number;
    requestDetails: string;
    priority: number;
    status: 'received' | 'in progress' | 'awaiting confirmation' | 'completed' | 'canceled';
}

// Middleware
app.use(bodyParser.json());

// Utility function to safely read/write to the JSON file
const readRequestsFromFile = async (): Promise<ServiceRequest[]> => {
    try {
        const data = await fs.readFile(REQUESTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the file:', error);
        return [];
    }
};

const writeRequestsToFile = async (data: ServiceRequest[]): Promise<void> => {
    try {
        await fs.writeFile(REQUESTS_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to the file:', error);
    }
};

// API Endpoints

// POST /requests - Add a new service request
app.post('/requests', async (req: Request, res: Response) => {
    const { guestName, roomNumber, requestDetails, priority } = req.body;
    const newRequest: ServiceRequest = {
        id: uuidv4(),
        guestName,
        roomNumber,
        requestDetails,
        priority: priority || 3, // Default priority if not provided
        status: 'received',
    };

    const requests = await readRequestsFromFile();
    requests.push(newRequest);
    await writeRequestsToFile(requests);

    res.status(201).json(newRequest);
});

// GET /requests - Retrieve all requests, sorted by priority
app.get('/requests', async (req: Request, res: Response) => {
    const requests = await readRequestsFromFile();
    const sortedRequests = requests.sort((a: ServiceRequest, b: ServiceRequest) => a.priority - b.priority);
    res.status(200).json(sortedRequests);
});

// GET /requests/:id - Retrieve a specific request by ID
app.get('/requests/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const requests = await readRequestsFromFile();
    const request = requests.find((req) => req.id === id);

    if (request) {
        res.status(200).json(request);
    } else {
        res.status(404).json({ message: 'Request not found' });
    }
});

// PUT /requests/:id - Update details or priority of an existing request
app.put('/requests/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { guestName, roomNumber, requestDetails, priority, status } = req.body;

    const requests = await readRequestsFromFile();
    const requestIndex = requests.findIndex((req) => req.id === id);

    if (requestIndex !== -1) {
        requests[requestIndex] = {
            ...requests[requestIndex],
            guestName: guestName || requests[requestIndex].guestName,
            roomNumber: roomNumber || requests[requestIndex].roomNumber,
            requestDetails: requestDetails || requests[requestIndex].requestDetails,
            priority: priority !== undefined ? priority : requests[requestIndex].priority,
            status: status || requests[requestIndex].status,
        };
        await writeRequestsToFile(requests);
        res.status(200).json(requests[requestIndex]);
    } else {
        res.status(404).json({ message: 'Request not found' });
    }
});

// DELETE /requests/:id - Remove a completed or canceled request
app.delete('/requests/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const requests = await readRequestsFromFile();
    const filteredRequests = requests.filter((req) => req.id !== id);

    if (requests.length !== filteredRequests.length) {
        await writeRequestsToFile(filteredRequests);
        res.status(200).json({ message: 'Request deleted successfully' });
    } else {
        res.status(404).json({ message: 'Request not found' });
    }
});

// POST /requests/:id/complete - Mark a request as completed
app.post('/requests/:id/complete', async (req: Request, res: Response) => {
    const { id } = req.params;
    const requests = await readRequestsFromFile();
    const requestIndex = requests.findIndex((req) => req.id === id);

    if (requestIndex !== -1) {
        requests[requestIndex].status = 'completed';
        await writeRequestsToFile(requests);
        res.status(200).json(requests[requestIndex]);
    } else {
        res.status(404).json({ message: 'Request not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
