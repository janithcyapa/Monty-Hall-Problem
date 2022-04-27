import _ from "lodash";

const result = [];
let _total_runs = 25;
let _runs_per_row = 100;

const test = () => {
  let keep_count = 0;
  let switch_count = 0;
  let runs_per_row = _runs_per_row;
  const run = () => {
    let data = [false, false, false];
    data[_.random(0, 2)] = true;

    const select = _.random(0, 2);
    const open_possibilities = [];
    [0, 1, 2].forEach((e) => {
      if (data[e]) return;
      if (select === e) return;
      open_possibilities.push(e);
    });
    const open = open_possibilities[Math.floor(Math.random() * open_possibilities.length)];

    const temp_data = [0, 1, 2];
    _.remove(temp_data, (_, i) => i === select || i === open);

    const _keep = data[select];
    const _switch = data[temp_data[0]];

    if (_keep) keep_count = keep_count + 1;
    if (_switch) switch_count = switch_count + 1;
    // console.log("init " + data);
    // console.log("select " + select);
    // console.log("possibilities " + open_possibilities);
    // console.log("open " + open);
    // console.log("temp " + temp_data);
    // console.log("keep " + _keep);
    // console.log("switch " + _switch);
  };

  (function repeat(number) {
    run();

    if (number > 1) repeat(number - 1);
  })(runs_per_row);

  result.push({ keep_count, switch_count, runs: switch_count + keep_count });
};

(function repeat(number) {
  test();

  if (number > 1) repeat(number - 1);
})(_total_runs);

console.table(result);
