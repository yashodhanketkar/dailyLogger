/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "gfteyclvhzl8j13",
    "created": "2023-12-13 12:07:06.091Z",
    "updated": "2023-12-13 12:07:06.091Z",
    "name": "logs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "f8vma5wa",
        "name": "task",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ddep1epc",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zuuwnbrj",
        "name": "project",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "hmgfqi3hg6ou0v7",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.verified = true",
    "viewRule": "@request.auth.verified = true",
    "createRule": "@request.auth.verified = true",
    "updateRule": "@request.auth.verified = true",
    "deleteRule": "@request.auth.verified = true",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("gfteyclvhzl8j13");

  return dao.deleteCollection(collection);
})
