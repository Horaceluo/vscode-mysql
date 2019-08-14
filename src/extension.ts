"use strict";
import * as vscode from "vscode";
import { AppInsightsClient } from "./common/appInsightsClient";
import { Utility } from "./common/utility";
import { ConnectionNode } from "./model/connectionNode";
import { DatabaseNode } from "./model/databaseNode";
import { INode } from "./model/INode";
import { TableNode } from "./model/tableNode";
import { MySQLTreeDataProvider } from "./mysqlTreeDataProvider";
import { IConnection } from "./model/connection";
import { Constants } from "./common/constants";
import { Global } from "./common/global";
import { ColumnNode } from "./model/columnNode";

export function activate(context: vscode.ExtensionContext) {
    AppInsightsClient.sendEvent("loadExtension");

    const mysqlTreeDataProvider = new MySQLTreeDataProvider(context);
    context.subscriptions.push(vscode.window.registerTreeDataProvider("mysql", mysqlTreeDataProvider));

    context.subscriptions.push(vscode.commands.registerCommand("mysql.refresh", (node: INode) => {
        AppInsightsClient.sendEvent("refresh");
        mysqlTreeDataProvider.refresh(node);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("mysql.addConnection", () => {
        mysqlTreeDataProvider.addConnection();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("mysql.deleteConnection", (connectionNode: ConnectionNode) => {
        connectionNode.deleteConnection(context, mysqlTreeDataProvider);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("mysql.runQuery", () => {
        Utility.runQuery();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("mysql.newQuery", (databaseOrConnectionNode: DatabaseNode | ConnectionNode) => {
        databaseOrConnectionNode.newQuery();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("mysql.selectTop1000", (tableNode: TableNode) => {
        tableNode.selectTop1000();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("mysql.copyTableName", (tableNode: TableNode) => {
        tableNode.copyToClip();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("mysql.copyColumnName", (columnNote: ColumnNode) => {
        columnNote.copyToClip();
    }));

    AppInsightsClient.sendEvent("addConnection.start");

    const host:string = process.env.SUPERMODEL_DB_HOST;
    const user:string = process.env.SUPERMODEL_DB_USERNAME;
    const password:string = process.env.SUPERMODEL_DB_PASSWORD;
    const port:string = process.env.SUPERMODEL_DB_PORT;
    const certPath:string = '';

    let connections = context.globalState.get<{ [key: string]: IConnection }>(Constants.GlobalStateMySQLConectionsKey);
    if (!connections) {
        connections = {};
    }

    const id = '1';
    connections[id] = {
        host,
        user,
        port,
        certPath,
    };

    if (password) {
        Global.keytar.setPassword(Constants.ExtensionId, id, password);
    }
    context.globalState.update(Constants.GlobalStateMySQLConectionsKey, connections);
    mysqlTreeDataProvider.refresh();
    AppInsightsClient.sendEvent("addConnection.end");
}

export function deactivate() {
}
