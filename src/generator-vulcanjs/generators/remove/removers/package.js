const VulcanGenerator = require('../../../lib/VulcanGenerator');

module.exports = class extends VulcanGenerator {
  initializing () {
    this._assert('isVulcan');
    this._assert('hasNonZeroPackages');
  }

  _registerArguments () {
    // TODO: add arguments for remove
  }

  prompting () {
    if (!this._canPrompt()) { return false; }
    const questions = this._getQuestions(
      'packageNameList',
      'isDelete'
    );
    return this.prompt(questions)
      .then((answers) => {
        this._assert('isDelete', answers.isDelete);
        this.props = {
          packageName: this._finalize('packageName', answers),
        };
      });
  }

  writing () {
    if (!this._canWrite()) { return false; }
    const sourceDir = this._getPath(
      { isAbsolute: true },
      'package'
    );
    this.fs.delete(sourceDir);
  }

  end () {
    this._end();
  }
};
