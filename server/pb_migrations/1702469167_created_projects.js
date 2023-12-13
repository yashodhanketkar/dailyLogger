/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hmgfqi3hg6ou0v7",
    "created": "2023-12-13 12:06:07.920Z",
    "updated": "2023-12-13 12:06:07.920Z",
    "name": "projects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "68jrnx0n",
        "name": "name",
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
        "id": "7mdtwdrv",
        "name": "github",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
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
  const collection = dao.findCollectionByNameOrId("hmgfqi3hg6ou0v7");

  return dao.deleteCollection(collection);
})
