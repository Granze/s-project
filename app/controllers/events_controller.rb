class EventsController < ApplicationController
  def index
    @events = Event.all

    respond_to do |format|
      format.html
      format.json  { render :json => @events }
      format.js
    end
  end

  def create
    @events = events.new(events_params)
    if @events.save
      render json: @events
    else
      render json: @events.errors, status: :unprocessable_entity
    end
  end

  def update
    @events.update_attributes!(events_params)
    render json: @events
  end

  def destroy
    @events.destroy
    head :no_content
  end

end
