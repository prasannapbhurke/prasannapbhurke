import React, { useState, useRef, useEffect } from 'react';
import { BarChart2, Play, RotateCcw, Trophy, Zap } from 'lucide-react';
import { sound } from '../utils/sound';
import { unlock, ACHIEVEMENTS } from '../utils/achievements';
import { useToast } from './ToastManager';
import confetti from 'canvas-confetti';

const ARRAY_SIZE = 38;

function generateArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

function* bubbleSortSteps(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
      yield [...a];
    }
  }
  yield [...a];
}

function* mergeSortSteps(arr) {
  const a = [...arr];
  const frames = [];
  function merge(arr, l, m, r) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) arr[k++] = left[i++];
      else arr[k++] = right[j++];
      frames.push([...arr]);
    }
    while (i < left.length) { arr[k++] = left[i++]; frames.push([...arr]); }
    while (j < right.length) { arr[k++] = right[j++]; frames.push([...arr]); }
  }
  function mergeSort(arr, l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
  mergeSort(a, 0, a.length - 1);
  for (const frame of frames) yield frame;
  yield [...a];
}

export default function AlgoRaceMode() {
  const [initial] = useState(() => generateArray(ARRAY_SIZE));
  const [bubbleArr, setBubbleArr] = useState(initial);
  const [mergeArr, setMergeArr] = useState(initial);
  const [running, setRunning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [bubbleDone, setBubbleDone] = useState(false);
  const [mergeDone, setMergeDone] = useState(false);
  const [isBatman, setIsBatman] = useState(false);
  const [arr] = useState(initial);
  const { toast } = useToast();

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    return () => obs.disconnect();
  }, []);

  const reset = () => {
    setRunning(false);
    setWinner(null);
    setBubbleDone(false);
    setMergeDone(false);
    setBubbleArr(arr);
    setMergeArr(arr);
    sound.playClick();
  };

  const race = () => {
    if (running) return;
    setRunning(true);
    setWinner(null);
    setBubbleDone(false);
    setMergeDone(false);
    setBubbleArr(arr);
    setMergeArr(arr);
    sound.playClick();

    const bubbleGen = bubbleSortSteps(arr);
    const mergeGen = mergeSortSteps(arr);

    let bubbleFinished = false;
    let mergeFinished = false;

    const tick = setInterval(() => {
      if (!bubbleFinished) {
        const next = bubbleGen.next();
        if (!next.done) setBubbleArr(next.value);
        else { bubbleFinished = true; setBubbleDone(true); }
      }
      if (!mergeFinished) {
        // Merge sort advances 3 steps per tick (it's faster)
        for (let i = 0; i < 3; i++) {
          const next = mergeGen.next();
          if (!next.done) setMergeArr(next.value);
          else { mergeFinished = true; setMergeDone(true); break; }
        }
      }

      if (bubbleFinished && mergeFinished && !winner) {
        clearInterval(tick);
        setRunning(false);
        const w = 'Merge Sort';
        setWinner(w);
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        sound.playSuccess();
        toast(`🏆 ${w} wins the race!`, 'achievement', 4000);
        unlock(ACHIEVEMENTS.ALGO_RACE);
      }

      // Detect winner mid-race
      if (mergeFinished && !bubbleFinished && !winner) {
        setWinner('Merge Sort');
      } else if (bubbleFinished && !mergeFinished && !winner) {
        setWinner('Bubble Sort');
      }
    }, 30);
  };

  const barColor = (isDone, isBat) => {
    if (isDone) return isBat ? '#facc15' : '#a855f7';
    return isBat ? 'rgba(250,204,21,0.7)' : 'rgba(168,85,247,0.7)';
  };

  const Bar = ({ arr, label, done }) => (
    <div className="flex-1">
      <div className={`text-xs font-mono font-bold mb-2 flex items-center gap-2 ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>
        {label}
        {done && <span className="text-emerald-400 text-[10px]">✓ Done</span>}
        {winner === label && <Trophy size={12} className="text-yellow-400" />}
      </div>
      <div className="flex items-end gap-[2px] h-32 bg-slate-950 rounded-xl p-2 border border-slate-800">
        {arr.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all duration-50"
            style={{
              height: `${v}%`,
              backgroundColor: barColor(done, isBatman),
              minWidth: 4,
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className={`p-6 rounded-2xl border space-y-5 font-mono ${
      isBatman ? 'bg-slate-950 border-yellow-500/40' : 'bg-slate-950 border-purple-500/40'
    }`}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className={`flex items-center gap-2 font-bold text-sm ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>
          <Zap size={16} />
          Algorithm Race Mode — Bubble Sort vs Merge Sort
        </div>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs hover:text-white transition-colors"
          >
            <RotateCcw size={12} /> Reset
          </button>
          <button
            onClick={race}
            disabled={running}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              running
                ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-400 border border-slate-700'
                : isBatman
                  ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                  : 'bg-purple-600 text-white hover:bg-purple-500'
            }`}
          >
            <Play size={12} /> {running ? 'Racing…' : 'Start Race!'}
          </button>
        </div>
      </div>

      {winner && (
        <div className={`text-center py-3 rounded-xl border text-sm font-bold animate-pulse ${
          isBatman ? 'bg-yellow-950/60 border-yellow-400/50 text-yellow-300' : 'bg-purple-950/60 border-purple-400/50 text-purple-300'
        }`}>
          🏆 Winner: {winner}! — O(n log n) beats O(n²) every time.
        </div>
      )}

      <div className="flex gap-4">
        <Bar arr={bubbleArr} label="Bubble Sort  O(n²)" done={bubbleDone} />
        <Bar arr={mergeArr} label="Merge Sort  O(n log n)" done={mergeDone} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-400">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-slate-300 font-bold mb-1">Bubble Sort</p>
          <p>Time: <span className="text-red-400">O(n²)</span> — {ARRAY_SIZE}² = {ARRAY_SIZE ** 2} comparisons</p>
          <p>Space: O(1) — in-place, no allocations</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-slate-300 font-bold mb-1">Merge Sort</p>
          <p>Time: <span className="text-emerald-400">O(n log n)</span> — {ARRAY_SIZE}×{Math.round(Math.log2(ARRAY_SIZE))} ≈ {ARRAY_SIZE * Math.round(Math.log2(ARRAY_SIZE))} ops</p>
          <p>Space: O(n) — requires auxiliary array</p>
        </div>
      </div>
    </div>
  );
}
