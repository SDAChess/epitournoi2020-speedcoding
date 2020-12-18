import PluginBase from "terminal-in-react/lib/js/components/Plugin";

export class IOPlugin extends PluginBase {
    static displayName = 'IOPlugin';
    static version = '1.0.0';

    constructor(api, config) {
        super(api, config);
        this.api = api;
        this.config = config;
        this.fileContent = "";
        config.callback(this);
    }

    writeFileToDB(path, content) {
        const writeFile = this.api.getPluginMethod(this.config.filesystem, 'writeFile');
        const createFile = this.api.getPluginMethod(this.config.filesystem, 'createFile');
        const parsePath = this.api.getPluginMethod(this.config.filesystem, 'parsePath');
        const readFile = this.api.getPluginMethod(this.config.filesystem, 'readFile');
        const filePath = parsePath(path);
        readFile(filePath, (file) => {
            this.api.removeLine()
            if (file !== null && typeof file === 'string') {
                writeFile(filePath, content);
            } else if (file === null) {
                createFile(filePath);
                writeFile(filePath, content);
            }
        });
    }

    flush(){
        this.api.removeLine();
    }

    readFile(path) {
        const parsePath = this.api.getPluginMethod(this.config.filesystem, 'parsePath');
        const readFile = this.api.getPluginMethod(this.config.filesystem, 'readFile');
        const filePath = parsePath(path);
        readFile(filePath, (file) => {
            if (file !== null && typeof file === 'string') {
                this.fileContent = file;
            } else if (file === null) {
                this.fileContent = "";
            }
        });
        return this.fileContent;
    }
}