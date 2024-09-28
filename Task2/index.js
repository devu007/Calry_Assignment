"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express'); // Using CommonJS require for express
var bodyParser = require('body-parser'); // Using CommonJS require for body-parser
var fs = require("fs-extra"); // Named import for fs-extra
var uuidv4 = require('uuid').v4;
var app = express();
var PORT = 3000;
var REQUESTS_FILE = './data/requests.json';
// Middleware
app.use(bodyParser.json());
// Utility function to safely read/write to the JSON file
var readRequestsFromFile = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.readFile(REQUESTS_FILE, 'utf8')];
            case 1:
                data = _a.sent();
                return [2 /*return*/, JSON.parse(data)];
            case 2:
                error_1 = _a.sent();
                console.error('Error reading the file:', error_1);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
var writeRequestsToFile = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.writeFile(REQUESTS_FILE, JSON.stringify(data, null, 2), 'utf8')];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error writing to the file:', error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// API Endpoints
// POST /requests - Add a new service request
app.post('/requests', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, guestName, roomNumber, requestDetails, priority, newRequest, requests;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, guestName = _a.guestName, roomNumber = _a.roomNumber, requestDetails = _a.requestDetails, priority = _a.priority;
                newRequest = {
                    id: uuidv4(),
                    guestName: guestName,
                    roomNumber: roomNumber,
                    requestDetails: requestDetails,
                    priority: priority || 3, // Default priority if not provided
                    status: 'received',
                };
                return [4 /*yield*/, readRequestsFromFile()];
            case 1:
                requests = _b.sent();
                requests.push(newRequest);
                return [4 /*yield*/, writeRequestsToFile(requests)];
            case 2:
                _b.sent();
                res.status(201).json(newRequest);
                return [2 /*return*/];
        }
    });
}); });
// GET /requests - Retrieve all requests, sorted by priority
app.get('/requests', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requests, sortedRequests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, readRequestsFromFile()];
            case 1:
                requests = _a.sent();
                sortedRequests = requests.sort(function (a, b) { return a.priority - b.priority; });
                res.status(200).json(sortedRequests);
                return [2 /*return*/];
        }
    });
}); });
// GET /requests/:id - Retrieve a specific request by ID
app.get('/requests/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, requests, request;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, readRequestsFromFile()];
            case 1:
                requests = _a.sent();
                request = requests.find(function (req) { return req.id === id; });
                if (request) {
                    res.status(200).json(request);
                }
                else {
                    res.status(404).json({ message: 'Request not found' });
                }
                return [2 /*return*/];
        }
    });
}); });
// PUT /requests/:id - Update details or priority of an existing request
app.put('/requests/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, guestName, roomNumber, requestDetails, priority, status, requests, requestIndex;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, guestName = _a.guestName, roomNumber = _a.roomNumber, requestDetails = _a.requestDetails, priority = _a.priority, status = _a.status;
                return [4 /*yield*/, readRequestsFromFile()];
            case 1:
                requests = _b.sent();
                requestIndex = requests.findIndex(function (req) { return req.id === id; });
                if (!(requestIndex !== -1)) return [3 /*break*/, 3];
                requests[requestIndex] = __assign(__assign({}, requests[requestIndex]), { guestName: guestName || requests[requestIndex].guestName, roomNumber: roomNumber || requests[requestIndex].roomNumber, requestDetails: requestDetails || requests[requestIndex].requestDetails, priority: priority !== undefined ? priority : requests[requestIndex].priority, status: status || requests[requestIndex].status });
                return [4 /*yield*/, writeRequestsToFile(requests)];
            case 2:
                _b.sent();
                res.status(200).json(requests[requestIndex]);
                return [3 /*break*/, 4];
            case 3:
                res.status(404).json({ message: 'Request not found' });
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
// DELETE /requests/:id - Remove a completed or canceled request
app.delete('/requests/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, requests, filteredRequests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, readRequestsFromFile()];
            case 1:
                requests = _a.sent();
                filteredRequests = requests.filter(function (req) { return req.id !== id; });
                if (!(requests.length !== filteredRequests.length)) return [3 /*break*/, 3];
                return [4 /*yield*/, writeRequestsToFile(filteredRequests)];
            case 2:
                _a.sent();
                res.status(200).json({ message: 'Request deleted successfully' });
                return [3 /*break*/, 4];
            case 3:
                res.status(404).json({ message: 'Request not found' });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
// POST /requests/:id/complete - Mark a request as completed
app.post('/requests/:id/complete', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, requests, requestIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, readRequestsFromFile()];
            case 1:
                requests = _a.sent();
                requestIndex = requests.findIndex(function (req) { return req.id === id; });
                if (!(requestIndex !== -1)) return [3 /*break*/, 3];
                requests[requestIndex].status = 'completed';
                return [4 /*yield*/, writeRequestsToFile(requests)];
            case 2:
                _a.sent();
                res.status(200).json(requests[requestIndex]);
                return [3 /*break*/, 4];
            case 3:
                res.status(404).json({ message: 'Request not found' });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
// Start the server
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
