import * as mysql from "mysql";
import * as path from "path";
import * as vscode from "vscode";
import { AppInsightsClient } from "../common/appInsightsClient";
import { Global } from "../common/global";
import { OutputChannel } from "../common/outputChannel";
import { Utility } from "../common/utility";
import { InfoNode } from "./infoNode";
import { INode } from "./INode";
import * as clipboardy from "clipboardy";
import * as copy from 'copy-text-to-clipboard';

export class ColumnNode implements INode {
    constructor(private readonly host: string, private readonly user: string, private readonly password: string,
                private readonly port: string, private readonly database: string, private readonly column: any ) {
    }

    public getTreeItem(): vscode.TreeItem {
        return {
            label: `${this.column.COLUMN_COMMENT} : ${this.column.COLUMN_NAME}`,
            collapsibleState: vscode.TreeItemCollapsibleState.None,
            contextValue: "column",
            iconPath: path.join(__filename, "..", "..", "..", "resources", this.column.COLUMN_KEY === "PRI" ? "b_primary.png" : "b_props.png"),
        };
    }

    public async getChildren(): Promise<INode[]> {
        return [];
    }

    public async copyToClip() {
        if (typeof process === 'object') {
            clipboardy.writeSync(this.column.COLUMN_NAME);
        } else {
            copy(this.column.COLUMN_NAME);
        }
    }
}
