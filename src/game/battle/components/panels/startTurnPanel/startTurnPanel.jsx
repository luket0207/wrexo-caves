export default function StartTurnPanel({ onRoll, isRolling, roll }) {
  return (
    <div className="battle-panel-content start-turn-panel">
      <div className="panel-section">
        <div className="panel-title">Roll options</div>
        <button type="button" onClick={onRoll} disabled={isRolling}>
          Roll
        </button>
        {isRolling && <div className="panel-status">Rolling...</div>}
        {roll != null && <div className="panel-status">Rolled: {roll}</div>}
      </div>
      <div className="panel-section">
        <div className="panel-title">Play item options</div>
        <div className="panel-status">No items available.</div>
      </div>
    </div>
  );
}
