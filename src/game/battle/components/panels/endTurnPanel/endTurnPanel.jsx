export default function EndTurnPanel({ nextTurnLabel, onConfirm }) {
  return (
    <div className="battle-panel-content end-turn-panel">
      <div className="panel-title">{nextTurnLabel}</div>
      <button type="button" onClick={onConfirm}>
        OK
      </button>
    </div>
  );
}
