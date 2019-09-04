"use strict";
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
        while (_) try {
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
var express_1 = require("express");
var db = require("../data/db");
exports.router = express_1.Router();
exports.router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.find()];
            case 1:
                response = _a.sent();
                if (response !== undefined) {
                    res.status(200).json(response);
                }
                else {
                    res.status(404).send('no posts found');
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).send('error getting posts');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, contents, response, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, contents = _a.contents;
                if (title === undefined || contents === undefined) {
                    res.status(400).send('must provide title and contents');
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.insert({ title: title, contents: contents })];
            case 2:
                response = _b.sent();
                if (response !== undefined) {
                    res.status(200).json(response);
                }
                else {
                    res.status(500).send('no id generated while adding post');
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(500).send('error adding post');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.findById(id)];
            case 2:
                response = _a.sent();
                if (response !== undefined && response.length > 0) {
                    res.status(200).json(response);
                }
                else {
                    res.status(404).end();
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).end();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.router.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, contents, task, putResponse, getResponse, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, title = _a.title, contents = _a.contents;
                task = 'updating post';
                if (title === undefined && contents === undefined) {
                    res.status(400).send('must provide title or contents');
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, db.update(id, { title: title, contents: contents })];
            case 2:
                putResponse = _b.sent();
                if (!(putResponse !== undefined)) return [3 /*break*/, 4];
                task = 'getting updated post';
                return [4 /*yield*/, db.findById(id)];
            case 3:
                getResponse = _b.sent();
                if (getResponse !== undefined && getResponse.length > 0) {
                    res.status(200).json(getResponse);
                }
                else {
                    res.status(500).send('unable to get updated post');
                }
                return [3 /*break*/, 5];
            case 4:
                res.status(500).send('no id generated while adding post');
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_4 = _b.sent();
                res.status(500).send("error " + task);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, posts, deletedPostsCount, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, db.findById(id)];
            case 2:
                posts = _a.sent();
                if (!(posts !== undefined && posts.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, db.remove(id)];
            case 3:
                deletedPostsCount = _a.sent();
                if (posts.length === deletedPostsCount) {
                    res.status(200).json(posts);
                }
                else {
                    res.status(500).send("error deleting posts with id " + id);
                }
                return [3 /*break*/, 5];
            case 4:
                res.status(404).send("no posts found with id " + id);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_5 = _a.sent();
                res.status(500).send("error deleting posts with id " + id);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/:id/comments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.findPostComments(id)];
            case 2:
                response = _a.sent();
                if (response !== undefined && response.length > 0) {
                    res.status(200).json(response);
                }
                else {
                    res.status(404).send("no comments on post " + id);
                }
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(500).send('error getting comments');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.router.post('/:id/comments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, text, comment, response, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                text = req.body.text;
                if (text === undefined) {
                    res.status(400).send('must provide comment');
                    return [2 /*return*/];
                }
                comment = {
                    post_id: id,
                    text: text,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.insertComment(comment)];
            case 2:
                response = _a.sent();
                if (response !== undefined) {
                    res.status(200).json(response);
                }
                else {
                    res.status(500).send("error adding comment to id " + id);
                }
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(500).send("error adding comment to id " + id);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// module.exports = router;
exports.default = exports.router;
